const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        // category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        category: { type: String, required: true },
        // brand: { type: String, enum: ["Apple", "Samsung", "Lenovo"] },
        brand: { type: String, required: true },
        quantity: { type: Number, required: true },
        sold: { type: Number, default: 0 }, // if we do not show the 'sold' we can use 'select:false:
        images: [
            {
                public_id: String,
                url: String,
            },
        ],
        // color: { type: String, enum: ["Black", "Brown", "Red"] },
        color: [{ type: mongoose.Schema.Types.ObjectId, ref: "Color" }],
        tags: String,
        ratings: [
            {
                star: Number,
                comment: String,
                postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
            },
        ],
        totalrating: {
            type: String,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
