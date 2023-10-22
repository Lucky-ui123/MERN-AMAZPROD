const express = require("express");
const {
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
    createOrder,
    removeProductFromCart,
    updateProductQuantityFromCart,
    getMyOrders,
    getMonthWiseOrderIncome,
    getMonthWiseOrderCount,
    getYearlyTotalOrders,
    getAllOrders,
    getSignleOrders,
    updateOrder,
    emptyCart,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddeleware");
const { checkout, paymentVerification } = require("../controller/paymentCtrl");
const router = express.Router();

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);
/* router.put( "/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus ); */

router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);

router.get("/all-users", getallUser);
router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaOrder/:id", authMiddleware, isAdmin, getSignleOrders);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrder);
/*router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders); */
router.get("/refresh", handleRefreshToken); // it is used in particular way
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getYearlyTotalOrders", authMiddleware, getYearlyTotalOrders);
// router.get("/getMonthWiseOrderCount", authMiddleware, getMonthWiseOrderCount);
router.get("/:id", authMiddleware, isAdmin, getAUser);
router.get("/logout", logout);

// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete( "/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart );
router.delete( "/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart );
router.delete("/empty-cart",authMiddleware, emptyCart);
router.delete("/:id", deleteUser);

router.put("/edit-user", authMiddleware, updateaUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unBlockUser);

module.exports = router;
