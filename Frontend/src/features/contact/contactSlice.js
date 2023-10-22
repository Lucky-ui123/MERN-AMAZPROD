import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";


export const createQuery = createAsyncThunk(
    "contact/post",
    async (contactData, thunkApi) => {
        try {
            return await contactService.postQuery(contactData);
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
);

const contactState = {
    contact: "",
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const contactSlice = createSlice({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contact = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Contact Form Submitted Successfully");
                }
            })
            .addCase(createQuery.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error('Something is Error')
                }
            });
    },
});

export default contactSlice.reducer;
