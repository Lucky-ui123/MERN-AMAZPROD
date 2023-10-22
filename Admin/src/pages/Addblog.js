import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Stepper } from "react-form-stepper";
import { useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
    getBlogCategories,
    resetState,
} from "../features/blogCategory/blogCategorySlice";
import {
    createBlog,
    createBlogs,
    getABlog,
    updateABlog,
} from "../features/blog/blogSlice";

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    category: yup.string().required("Category is Required"),
});
const Addblog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogId = location.pathname.split("/")[3];

    useEffect(() => {
        if (getBlogId !== undefined) {
            dispatch(getABlog(getBlogId));
            img.push(blogImages) // for adding here instead of (images: blogImages || "")
        } else {
            dispatch(resetState());
        }
    }, [getBlogId]);

    const [images, setImages] = useState([]);

    useEffect(() => {
        // for getting the categories values in 'category' input
        dispatch(resetState());
        dispatch(getBlogCategories());
    }, []);

    const imgState = useSelector((state) => state.upload.images);
    const blogCategoryState = useSelector(
        (state) => state.blogcategory.blogCategories
    );
    const blogState = useSelector((state) => state.blog); // choose main one only when add the products
    const {
        isSuccess,
        isError,
        isLoading,
        createdBlog,
        updatedBlog,
        blogName,
        blogDesc,
        blogCategory,
        blogImages,
    } = blogState;
    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfully");
        }
        if (isSuccess && updatedBlog) {
            toast.success("Blog Updated Successfully");
            navigate("/admin/blog-list");
        }
        if (isError) {
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        formik.values.images = img;
    }, []); // for getting infinite loop , remove the dependency of [img]

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: blogName || "",
            description: blogDesc || "",
            category: blogCategory || "",
            // images: blogImages || "", // it is getting infinite loop error
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBlogId !== undefined) {
                const data = { id: getBlogId, blogData: values };
                dispatch(updateABlog(data));
                dispatch(resetState());
            } else {
                dispatch(createBlogs(values)); // it is for create the blogs
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState()); // it is for remove the toast popup multiple times
                }, 300);
            }
        },
    });

    return (
        <>
            <h3 className="mb-4 title">
                {getBlogId !== undefined ? "Edit" : "Add"} Blog
            </h3>
            {/* <Stepper steps={[ { label: "Add Blog Details" }, { label: "Upload Images" }, { label: "Finish" }, ]} activeStep={1} /> */}
            <div>
                <form
                    action=""
                    onSubmit={formik.handleSubmit}
                >
                    <CustomInput
                        type="text"
                        className="mt-4"
                        name="title"
                        label="Enter Blog Title"
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>

                    <select
                        className="form-control py-3 mt-3 "
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                    >
                        <option value="">Select Blog Category</option>
                        {blogCategoryState.map((i, j) => {
                            return (
                                <option
                                    key={j}
                                    value={i.title}
                                >
                                    {i.title}
                                </option>
                            );
                        })}
                    </select>
                    <div className="error">
                        {formik.touched.category && formik.errors.category}
                    </div>

                    <ReactQuill
                        theme="snow"
                        className="mt-3"
                        name="description"
                        onChange={formik.handleChange}
                        // onBlur={formik.handleBlur("description")}
                        value={formik.values.description}
                    />
                    <div className="error">
                        {formik.touched.description &&
                            formik.errors.description}
                    </div>

                    <div className="bg-white border-1 mt-3 p-5 text-center">
                        <Dropzone
                            onDrop={(acceptedFiles) =>
                                dispatch(uploadImg(acceptedFiles))
                            }
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Drag 'n' drop some files here, or
                                            click to select files
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div
                                    className=" position-relative"
                                    key={j}
                                >
                                    <button
                                        type="button"
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                        onClick={() =>
                                            dispatch(delImg(i.public_id))
                                        }
                                    ></button>
                                    <img
                                        src={i.url}
                                        alt=""
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="btn btn-success border-0 rounded-3 my-5 "
                        type="submit"
                    >
                        {getBlogId !== undefined ? "Edit" : "Add"} Blog
                    </button>
                </form>
            </div>
        </>
    );
};

export default Addblog;
