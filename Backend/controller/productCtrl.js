const User = require("../models/userModel");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMondodbId");
/* const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs"); */

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Product Update
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    // validateMongoDbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate(
            { _id: id },
            req.body,
            {
                new: true,
            }
        );
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params;
    try {
        const deletedProduct = await Product.findOneAndDelete(id);
        res.json(deletedProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// get a product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params; // here need to add {}
    validateMongoDbId(id);
    try {
        const findProduct = await Product.findById(id).populate("color");
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// get all products
const getAllProduct = asyncHandler(async (req, res) => {
    console.log(req.query);
    try {
        // filtering
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);
        console.log(queryObj);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        ); // for price filtering

        let query = Product.find(JSON.parse(queryStr));

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limiting the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v"); // for remove something '-'
        }

        // pagination
        /*    
    1. page, limit 
    2. one page how many products we can show
    3. skip
     */
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount)
                throw new Error("This page does not exists");
        }
        console.log(page, limit, skip);

        const product = await query;
        res.json(product);

        /* const getallProducts = await Product.where("category").equals(
      req.query.category
    ); */ // another way to filtering

        /*  const getallProducts = await Product.find({
      brand: req.query.brand,
      category: req.query.category,
    }); // 'req.query' for filtering */

        // res.json(getallProducts);
    } catch (error) {
        throw new Error(error);
    }
});

// add to wishlist
const addToWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    try {
        const user = await User.findById(_id); // find user
        const alreadyadded = user.wishlist.find(
            (id) => id.toString() === prodId
        ); // check product is already added or not
        if (alreadyadded) {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishlist: prodId },
                },
                { new: true }
            );
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: prodId },
                },
                { new: true }
            );
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});

// rating
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        if (alreadyRated) {
            await Product.updateOne(
                {
                    "ratings._id": alreadyRated._id,
                },
                { $set: { "ratings.$.star": star ,  "ratings.$.comment": comment } }
            );
            // Fetch the updated product details
            const updatedProduct = await Product.findById(prodId);
            // res.json(updatedProduct);
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: _id,
                        },
                    },
                },
                {
                    new: true,
                }
            );
            // res.json(rateProduct);
        }
        const getallratings = await Product.findById(prodId);
        let totalRating = getallratings.ratings.length;
        let ratingsum = getallratings.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);

        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(
            prodId,
            {
                totalrating: actualRating,
            },
            { new: true }
        );
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error);
    }
});

/* const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, prodId, comment } = req.body;
    try {
        const product = await Product.findById(prodId);
        let alreadyRated = product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        );
        if (alreadyRated) {
            
            const updateRating = await Product.findOneAndUpdate(
                {
                    "ratings._id": alreadyRated._id,
                    // ratings: { elemMatch: alreadyRated },
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment,
                    },
                },
                { new: true }
            );
            // res.json(updateRating);
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedby: _id,
                        },
                    },
                },
                {
                    new: true,
                }
            );
            // res.json(rateProduct);
        }
        // getall
        const getallratings = await Product.findById(prodId);
        let totalRating = getallratings?.ratings?.length;
        let ratingsum = getallratings?.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => prev + curr, 0);
        let actualRating = Math.round(ratingsum / totalRating);
        let finalproduct = await Product.findByIdAndUpdate(
            prodId,
            {
                totalrating: actualRating,
            },
            { new: true }
        );
        res.json(finalproduct);
    } catch (error) {
        throw new Error(error);
    }
}); */

module.exports = {
    createProduct,
    getaProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    addToWishlist,
    rating,
};
