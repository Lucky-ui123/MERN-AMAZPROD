const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMondodbId");

// Create Coupon
const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all Coupons
const getallCoupons = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all Coupons
const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatecoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatecoupon);
    } catch (error) {
        throw new Error(error);
    }
});

// Get Coupons
const getCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getAcoupon = await Coupon.findById(id);
        res.json(getAcoupon);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all Coupons
const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletecoupon = await Coupon.findByIdAndDelete(id);
        res.json(deletecoupon);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createCoupon,
    getallCoupons,
    updateCoupon,
    getCoupon,
    deleteCoupon,
};
