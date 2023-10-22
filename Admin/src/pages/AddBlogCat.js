import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    createBlogCategory,
    getABlogCategory,
    resetState,
    updateABlogCategory,
} from "../features/blogCategory/blogCategorySlice";

let schema = yup.object().shape({
    title: yup.string().required("Category Name is Required"),
});
const AddBlogCat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogCatId = location.pathname.split("/")[3];

    const newBlogCategory = useSelector((state) => state.blogcategory);
    const {
        isSuccess,
        isError,
        isLoading,
        createdBlogCategory,
        blogCatName,
        updatedBlogCategory,
    } = newBlogCategory;

    useEffect(() => {
        if (getBlogCatId !== undefined) {
            dispatch(getABlogCategory(getBlogCatId));
        } else {
            dispatch(resetState());
        }
    }, [getBlogCatId]);
    useEffect(() => {
        if (isSuccess && createdBlogCategory) {
            toast.success("Blog Category Added Successfully");
        }
        if (isSuccess && updatedBlogCategory) {
            toast.success("Blog Category Updated Successfully");
            navigate("/admin/blog-category-list");
        }
        if (isError) {
            toast.error("Something went wrong");
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogCatName || "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            const data = { id: getBlogCatId, blogCatData: values };
            if (getBlogCatId !== undefined) {
                dispatch(updateABlogCategory(data));
                dispatch(resetState());
            } else {
                dispatch(createBlogCategory(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                    // navigate("/admin/blog-category-list");
                }, 3000);
            }
        },
    });

    return (
        <div>
            <h3 className="mb-4 title">
                {getBlogCatId !== undefined ? "Edit" : "Add"} Blog Category
            </h3>
            <div>
                <form
                    action=""
                    onSubmit={formik.handleSubmit}
                >
                    <CustomInput
                        type="text"
                        name="title"
                        label="Enter Blog Category"
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
                        {getBlogCatId !== undefined ? "Edit" : "Add"} Blog
                        Category
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBlogCat;
