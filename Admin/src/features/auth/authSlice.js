import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// 5
const getUserFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

//2
const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

// 3.1
export const login = createAsyncThunk(
    "auth/admin-login",
    async (user, thunkAPI) => {
        try {
            return await authService.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// get orders
export const getOrders = createAsyncThunk(
    "order/get-orders",
    async (data,thunkAPI) => {
        try {
            return await authService.getOrders(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// get orders
export const getOrder = createAsyncThunk(
    "order/get-order",
    async (id, thunkAPI) => {
        try {
            return await authService.getOrder(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// get orders
export const updateAOrder = createAsyncThunk(
    "order/update-order",
    async (data, thunkAPI) => {
        try {
            return await authService.updateOrder(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// get orders
export const getMonthlyData = createAsyncThunk(
    "order/monthlyData",
    async (data,thunkAPI) => {
        try {
            return await authService.getMonthlyOrders(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// get orders
export const getYearlyData = createAsyncThunk(
    "order/yearlyData",
    async (data,thunkAPI) => {
        try {
            return await authService.getYearlyStats(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//3
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // 4
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.user = null;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.orders = action.payload;
                state.message = "Success";
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.error;
            })
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.singleOrder = action.payload;
                state.message = "Success";
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.error;
            })
            .addCase(updateAOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAOrder.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.updateOrder = action.payload;
                state.message = "Success";
            })
            .addCase(updateAOrder.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.error;
            })
            .addCase(getMonthlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMonthlyData.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.monthlyData = action.payload;
                state.message = "Success";
            })
            .addCase(getMonthlyData.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.error;
            })
            .addCase(getYearlyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getYearlyData.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.yearlyData = action.payload;
                state.message = "Success";
            })
            .addCase(getYearlyData.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.error;
            });
    },
});

export default authSlice.reducer;
