import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    createCategory,
    getAProductCategory,
    resetState,
    updateAProductCategory,
} from "../features/prodCategory/prodCategorySlice";

let schema = yup.object().shape({
    title: yup.string().required("Category Name is Required"),
});

const Addcat = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const getProdCatId = location.pathname.split("/")[3];
    const navigate = useNavigate();
    const newProduct = useSelector((state) => state.prodCategory);
    const {
        isSuccess,
        isError,
        isLoading,
        createdCategory,
        categoryName,
        updatedCategory,
    } = newProduct;

    useEffect(() => {
        if (getProdCatId !== undefined) {
            dispatch(getAProductCategory(getProdCatId));
        } else {
            dispatch(resetState());
        }
    }, [getProdCatId]);

    useEffect(() => {
        if (isSuccess && createdCategory) {
            toast.success("Category Added Successfully");
        }
        if (isSuccess && updatedCategory) {
            toast.success("Category Updated Successfully");
            navigate("/admin/category-list");
        }
        if (isError) {
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: categoryName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getProdCatId !== undefined) {
                const data = { id: getProdCatId, prodCatData: values };
                dispatch(updateAProductCategory(data));
                dispatch(resetState());
            } else {
                dispatch(createCategory(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    // navigate("/admin/category-list");
                }, 3000);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">
                {getProdCatId !== undefined ? "Edit" : "Add"} Category
            </h3>
            <div>
                <form
                    action=""
                    onSubmit={formik.handleSubmit}
                >
                    <CustomInput
                        type="text"
                        name="title"
                        label="Enter Category"
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        {getProdCatId !== undefined ? "Edit" : "Add"} Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addcat;
