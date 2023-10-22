import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";


export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkApi) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkApi) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async (thunkApi) => {
        try {
            return await authService.getUserWishlist();
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const addProdToCart = createAsyncThunk(
    "user/cart/add",
    async (cartData, thunkApi) => {
        try {
            return await authService.addToCart(cartData);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const createAnOrder = createAsyncThunk(
    "user/cart/create-order",
    async (orderDetail, thunkApi) => {
        try {
            return await authService.createOrder(orderDetail);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async (data, thunkApi) => {
        try {
            return await authService.getCart(data);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const deleteUserCart = createAsyncThunk(
    "user/cart/delete",
    async (data, thunkApi) => {
        try {
            return await authService.emptyCart(data);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const getOrders = createAsyncThunk(
    "user/order/get",
    async (thunkApi) => {
        try {
            return await authService.getUserOrders();
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async (data, thunkApi) => {
        try {
            return await authService.removeProductFromCart(data);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async (cartDetail, thunkApi) => {
        try {
            return await authService.updateProductFromCart(cartDetail);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "user/profile/update",
    async (data, thunkApi) => {
        try {
            return await authService.updateUser(data);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const forgotPasswordToken = createAsyncThunk(
    "user/password/token",
    async (data, thunkApi) => {
        try {
            return await authService.forgotPassToken(data);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/password/reset",
    async (data, thunkApi) => {
        try {
            return await authService.resetPass(data);
        } catch (error) {
            const errorMessage = error.response
                ? error.response.data.message || "An error occurred"
                : "An error occurred";
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
);

export const resetState = createAction("Reset_all");

const getCustomerFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

const initialState = {
    user: getCustomerFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    /** wishlist remove if it gives me an error, I added this **/
    wishlist: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.info("User Created Successfully");
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    if (action.payload) {
                        toast.error(action.payload);
                    } else {
                        toast.error("An unknown error occurred");
                    }
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload;
                if (state.isSuccess === true) {
                    localStorage.setItem("token", action.payload.token); // save the token into localstorage, when user login
                    toast.info("User Logged In Successfully");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                //1st
                /* if (state.isError === true) {
                    // toast.error(action.payload.response.data.message);
                } */

                //2nd
                /* console.log("action.payload:", action.payload);
                console.log("action:", action);
            
                if (action.payload && action.payload.response && action.payload.response.data && action.payload.response.data.message) {
                    toast.error(action.payload.response.data.message);
                } else {
                    toast.error("An unknown error occurred");
                } */

                //3rd
                if (action.payload) {
                    toast.error(action.payload);
                } else {
                    toast.error("An unknown error occurred");
                }
            })
            .addCase(getUserProductWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getUserProductWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addProdToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProdToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Added to Cart");
                }
            })
            .addCase(addProdToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Deleted from Successfully");
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something went wrong!");
                }
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Product Updated  from cart Successfully");
                }
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something went wrong!");
                }
            })
            .addCase(createAnOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orderedProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Order Created Successfully");
                }
            })
            .addCase(createAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something went wrong in Order!");
                }
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getOrderedProduct = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedUser = action.payload;
                // if (state.isSuccess === true) {
                // console.log(action.payload);
                let currentUserData = JSON.parse(
                    localStorage.getItem("customer")
                );
                // console.log(JSON.parse(currentUserData));

                // sent new data
                let newUserData = {
                    _id: currentUserData?._id,
                    token: currentUserData?.token,
                    firstname: action?.payload?.firstname,
                    lastname: action?.payload?.lastname,
                    email: action?.payload?.email,
                    mobile: action?.payload?.mobile,
                };
                localStorage.setItem("customer", JSON.stringify(newUserData));
                state.user = newUserData;

                toast.success("Profile Updated Successfully");
                // }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something went wrong!");
                }
            })
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.token = action.payload;
                if (state.isSuccess) {
                    toast.success("Forgot Password Email Sent Successfully");
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something went wrong!");
                }
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.pass = action.payload;
                if (state.isSuccess) {
                    toast.success("Password Updated Successfully");
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Something went wrong!");
                }
            })
            .addCase(deleteUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCart = action.payload;
            })
            .addCase(deleteUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            }).addCase(resetState, ()=> initialState)
    },
});

export default authSlice.reducer;
