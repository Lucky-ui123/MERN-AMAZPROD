import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import prodCategoryService from "./prodCategoryService";

export const getProductCategories = createAsyncThunk(
    "productCategory/get-categories",
    async (thunkAPI) => {
        try {
            return await prodCategoryService.getProductCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//
export const createCategory = createAsyncThunk(
    "productCategory/create-category",
    async (categoryData, thunkAPI) => {
        try {
            return await prodCategoryService.createCategory(categoryData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//
export const getAProductCategory = createAsyncThunk(
    "productCategory/get-category",
    async (id, thunkAPI) => {
        try {
            return await prodCategoryService.getProductCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//
export const updateAProductCategory = createAsyncThunk(
    "productCategory/update-category",
    async (category, thunkAPI) => {
        try {
            return await prodCategoryService.updateProductCategory(category);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//
export const deleteAProductCategory = createAsyncThunk(
    "productCategory/delete-category",
    async (id, thunkAPI) => {
        try {
            return await prodCategoryService.deleteProductCategory(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset_all");

const initialState = {
    prodCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const prodCategorySlice = createSlice({
    name: "prodCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.prodCategories = action.payload;
            })
            .addCase(getProductCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdCategory = action.payload;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.categoryName = action.payload.title;
            })
            .addCase(getAProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCategory = action.payload;
            })
            .addCase(updateAProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteAProductCategory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAProductCategory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCategory = action.payload;
            })
            .addCase(deleteAProductCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default prodCategorySlice.reducer;
