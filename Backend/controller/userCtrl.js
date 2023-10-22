const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const uniqid = require("uniqid");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMondodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");

// async handler - create user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    // with the help of email find the user exists or not
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // if user not found, create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        // if user found then throw an error: User already exists
        throw new Error("User Already Exists");
    }
});

// Login user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if user already exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        // cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
            // isAdmin: findUser?.isAdmin,
        });
    } else {
        throw new Error("Invalid Creadentials");
    }
});

// Admin Login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check if user already exists or not
    const findAdmin = await User.findOne({ email });
    // if admin find
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");

    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateuser = await User.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        // cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
            // isAdmin: findUser?.isAdmin,
        });
    } else {
        throw new Error("Invalid Creadentials");
    }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    console.log(refreshToken);
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error("No Refresh Token present in DB or not matched");
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        } else {
            const accessToken = generateToken(user?._id);
            res.json({ accessToken });
        }
    });
});

// Logout functionality
const logout = asyncHandler(async (req, res) => {
    // check cookies
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    // find user
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); // forbidden status
    }
    await User.findOneAndUpdate(
        { refreshToken },
        {
            refreshToken: "",
        }
    );
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204);
});

// get all users
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error("error");
    }
});

// Update user
const updateaUser = asyncHandler(async (req, res) => {
    // const { id } = req.params; -- "another way to find 'id' "
    const { _id } = req.user;
    // validateMongoDbId(id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                // need to update
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

// save user address
const saveAddress = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                // need to update
                address: req?.body?.address,
            },
            {
                new: true,
            }
        );
        res.json(updatedUser);
    } catch (error) {
        throw new Error(error);
    }
});

// get a single user
const getAUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const getAUser = await User.findById(id);
        res.json({ getAUser });
    } catch (error) {
        throw new Error(error);
    }
});

// Delete a user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({ deleteUser });
    } catch (error) {
        throw new Error(error);
    }
});

// block user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blockusr = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json(blockusr);
    } catch (error) {
        throw new Error(error);
    }
});

// unBlock user
const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({
            message: "User UnBlocked",
        });
    } catch (error) {
        throw new Error(error);
    }
});

// updatePassword
const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user; // get id
    const { password } = req.body; // get password
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    } else {
        res.json(user);
    }
});

// forgot password
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body; // get mail
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken(); // create token
        await user.save();
        // const resetURL = `Hi, Please follow this link to reset Your Password. This linkis valid till 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</a>`;
        const resetURL = `Hi, Please follow this link to reset Your Password. This linkis valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`;
        const data = {
            to: email,
            text: "Hey user",
            subject: "Forgot Password Link",
            html: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error("Token is Expired, please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

// get wishlist
const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const findUser = await User.findById(_id).populate("wishlist");
        res.json(findUser);
    } catch (error) {
        throw new Error(error);
    }
});

// create user cart
const userCart = asyncHandler(async (req, res) => {
    const { productId, color, quantity, price } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        /* let products = [];
        const user = await User.findById(_id);
        // check if user already have product in cart
        const alreadyExistCart = await Cart.findOne({ orderby: user._id });
        if (alreadyExistCart) {
            alreadyExistCart.remove();
        }
        for (let i = 0; i < cart.length; i++) {
            let object = {};
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.color = cart[i].color;
            let getPrice = await Product.findById(cart[i]._id)
                .select("price")
                .exec();
            object.price = getPrice.price;
            products.push(object);
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count;
        } */

        let newCart = await new Cart({
            userId: _id,
            productId,
            color,
            price,
            quantity,
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});

// get user cart
const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const cart = await Cart.find({ userId: _id })
            .populate("productId")
            .populate("color");
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId } = req.params;
    validateMongoDbId(_id);
    try {
        const deleteProductFromcart = await Cart.deleteOne({
            userId: _id,
            _id: cartItemId,
        });
        res.json(deleteProductFromcart);
    } catch (error) {
        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const deleteCart = await Cart.deleteMany({
            userId: _id,
        });
        res.json(deleteCart);
    } catch (error) {
        throw new Error(error);
    }
});

const updateProductQuantityFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { cartItemId, newQuantity } = req.params;
    validateMongoDbId(_id);
    try {
        const cartItem = await Cart.findOne({
            userId: _id,
            _id: cartItemId,
        });
        cartItem.quantity = newQuantity;
        cartItem.save();
        res.json(cartItem);
    } catch (error) {
        throw new Error(error);
    }
});

// CreateOrder
const createOrder = asyncHandler(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        totalPrice,
        totalPriceAfterDiscount,
        paymentInfo,
    } = req.body;
    const { _id } = req.user;

    try {
        const order = await Order.create({
            shippingInfo,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
            paymentInfo,
            user: _id,
        });
        res.json({
            order,
            success: true,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// getMyOrder
const getMyOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    try {
        const orders = await Order.find({ user: _id })
            .populate("user")
            .populate("orderItems.product")
            .populate("orderItems.color");
        res.json({
            orders,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// getMyOrder
const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find().populate("user");
        res.json({
            orders,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// getMyOrder
const getSignleOrders = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.findOne({ _id: id })
            .populate("orderItems.product")
            .populate("orderItems.color");
        res.json({
            orders,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// getMyOrder
const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const orders = await Order.findById(id);
        orders.orderStatus = req.body.status;
        await orders.save();
        res.json({
            orders,
        });
    } catch (error) {
        throw new Error(error);
    }
});

// FOR ADMIN ANALYTICS

const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let d = new Date();
    let endDate = "";
    d.setDate(1);
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1);
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    }
    console.log(endDate);
    const data = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(),
                    $gte: new Date(endDate),
                },
            },
        },
        {
            $group: {
                _id: {
                    month: "$month",
                },
                amount: {
                    $sum: "$totalPriceAfterDiscount",
                },
                count: {
                    $sum: 1,
                },
            },
        },
    ]);
    res.json(data);
});

/* const getMonthWiseOrderCount = asyncHandler(async (req, res) => {
    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let d = new Date();
    let endDate = "";
    d.setDate(1);
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1);
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    }
    // console.log(endDate);
    const data = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(),
                    $gte: new Date(endDate),
                },
            },
        },
        {
            $group: {
                _id: {
                    month: "$month",
                },
                count: {
                     $sum: 1
                },
            },
        },
    ]);
    res.json(data);
}); */

const getYearlyTotalOrders = asyncHandler(async (req, res) => {
    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let d = new Date();
    let endDate = "";
    d.setDate(1);
    for (let index = 0; index < 11; index++) {
        d.setMonth(d.getMonth() - 1);
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    }
    // console.log(endDate);
    const data = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $lte: new Date(),
                    $gte: new Date(endDate),
                },
            },
        },
        {
            $group: {
                _id: null,
                count: {
                    $sum: 1,
                },
                amount: {
                    $sum: "$totalPriceAfterDiscount",
                },
            },
        },
    ]);
    res.json(data);
});

// CreateOrder
/* const createOrder = asyncHandler(async (req, res) => {
    // we need this all
    const {
        shippingInfo,
        orderItems,
        totalPrice,
        totalPriceAfterDiscount,
        paymentInfo,
    } = req.body;
    const { _id } = req.user;
    try {
        // Check if shippingInfo is provided and has an 'other' field
         if (shippingInfo && shippingInfo.other) {
        // Shipping info contains 'other' field
        const order = await Order.create({
            shippingInfo,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
            paymentInfo,
            user: _id,
        });
        res.json({
            order,
            success: true,
        });
          } else {
            // Shipping info does not contain 'other' field, handle it accordingly
            // You can add your custom logic here or simply return an error response
            res.status(400).json({
                // error: "Shipping information is missing or 'other' field is required.",
                error: message.error
            });
        }
    } catch (error) {
        throw new Error(error);
    }
}); */

// empty cart functionality
/* const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndRemove({ orderby: user._id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
}); */

// apply coupon
/*  const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
        throw new Error("Invalid Coupon");
    }
    const user = await User.findOne({ _id });
    let { cartTotal } = await Cart.findOne({
        orderby: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
        cartTotal -
        (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
        { orderby: user._id },
        { totalAfterDiscount },
        { new: true }
    );
    res.json(totalAfterDiscount);
});  */

// create Order
/* const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        if (!COD) throw new Error("Create cash order failed");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderby: user._id });
        let finalAmount = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finalAmount = userCart.totalAfterDiscount;
        } else {
            finalAmount = userCart.cartTotal;
        }

        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finalAmount,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "usd",
            },
            orderby: user._id,
            orderStatus: "Cash on Delivery",
        }).save();

        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: {
                        $inc: { quantity: -item.count, sold: +item.count },
                    },
                },
            };
        });

        const updated = await Product.bulkWrite(update, {});
        res.json({ message: "success" });
    } catch (error) {
        throw new Error(error);
    }
}); */

// get orders
/* const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const userorders = await Order.findOne({ orderby: _id })
            .populate("products.product")
            .populate("orderby") // so this done by after checking the frontend
            .exec();
        res.json(userorders);
    } catch (error) {
        throw new Error(error);
    }
}); */

// get all orders
/* const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const alluserorders = await Order.find()
            .populate("products.product")
            .populate("orderby") // so this done by after checking the frontend
            .exec();
        res.json(alluserorders);
    } catch (error) {
        throw new Error(error);
    }
}); */

// get all orders
/* const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const userorders = await Order.findOne({ orderby: id })
            .populate("products.product")
            .populate("orderby") // so this done by after checking the frontend
            .exec();
        res.json(userorders);
    } catch (error) {
        throw new Error(error);
    }
}); */

// update order status
/* const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateOrderStatus = await Order.findByIdAndUpdate(
            id,
            {
                orderStatus: status,
                paymentIntent: {
                    status: status,
                },
            },
            { new: true }
        );
        res.json(updateOrderStatus);
    } catch (error) {
        throw new Error(error);
    }
});  */

module.exports = {
    createUser,
    loginUserCtrl,
    getallUser,
    getAUser,
    deleteUser,
    updateaUser,
    blockUser,
    unBlockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    removeProductFromCart,
    emptyCart,
    updateProductQuantityFromCart,
    createOrder,
    getMyOrders,
    getAllOrders,
    getSignleOrders,
    updateOrder,
    getMonthWiseOrderIncome,
    // getMonthWiseOrderCount,
    getYearlyTotalOrders,

    /*  emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    getAllOrders,
    updateOrderStatus,
    getOrderByUserId, */
};
