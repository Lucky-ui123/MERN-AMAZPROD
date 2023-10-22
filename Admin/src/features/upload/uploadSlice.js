import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
    "upload/images",
    async (data, thunkAPI) => {
        try {
            // loop the images which are uploaded
            const formData = new FormData();
            for (let i = 0; i < data.length; i++) {
                formData.append("images", data[i]);
            }
            return await uploadService.uploadImg(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error); // main is below
            /*  if (error.response) {
                return thunkAPI.rejectWithValue({
                    message: error.message,
                    status: error.response.status,
                });
            } else {
                return thunkAPI.rejectWithValue({ message: error.message });
            } */
        }
    }
);
export const delImg = createAsyncThunk(
    "delete/images",
    async (id, thunkAPI) => {
        try {
            return await uploadService.deleteImg(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const initialState = {
    images: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const uploadSlice = createSlice({
    name: "images",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.images = action.payload;
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                // state.message = action.payload.message || "An error occurred";
                state.message = action.error;
                // state.status = action.payload.status || null;
            })
            .addCase(delImg.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(delImg.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                // state.images = action.payload; // if we use this it'll getting error
                state.images = []
            })
            .addCase(delImg.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
            });
    },
});

export default uploadSlice.reducer;
