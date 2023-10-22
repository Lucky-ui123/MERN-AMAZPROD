import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getProductCategories } from "../features/prodCategory/prodCategorySlice";
import { getColors } from "../features/color/colorSlice";
import { Select } from "antd";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    price: yup.number().required("Price is Required"),
    brand: yup.string().required("Brand is Required"),
    category: yup.string().required("Category is Required"),
    tags: yup.string().required("Tag is Required"),
    color: yup
        .array()
        .min(1, "Pick at least one color")
        .required("Colors are Required"),
    quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [brand, setBrand] = useState([])
    const [color, setColor] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        dispatch(getBrands());
        dispatch(getProductCategories());
        dispatch(getColors());
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const categoryState = useSelector(
        (state) => state.prodCategory.prodCategories
    );
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully");
        }
        if (isError) {
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const coloropt = [];
    colorState.forEach((i) => {
        coloropt.push({
            value: i._id,
            label: i.title,
            /*   _id: i._id,
            color: i.title, */
        });
    });

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url,
        });
    });

    useEffect(() => {
        // formik.values.color = color ;
        formik.values.color = color ? color : " ";
        formik.values.images = img;
    }, [color, img]);

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: "",
            brand: "",
            category: "",
            tags: "",
            color: "",
            quantity: "",
            images: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
              dispatch(createProducts(values));
            // alert(JSON.stringify(values));
            // console.log(values);
            formik.resetForm();
            setColor(null);
            setTimeout(() => {
                dispatch(resetState())
                // navigate("/admin/product-list");
            }, 3000);
        },
    });

    const [desc, setDesc] = useState([]);
    const hnadleDesc = (e) => {
        setDesc(e);
    };

    const handleColors = (e) => {
        setColor(e);
        // console.log(color);
    };
    return (
        <div>
            <h3 className="mb-4 title">Add Product</h3>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex gap-3 flex-column"
                >
                    <CustomInput
                        type="text"
                        label="Enter Product Title"
                        name="title"
                        onChange={formik.handleChange("title")}
                        onBlur={formik.handleBlur("title")}
                        value={formik.values.title}
                    />
                    <div className="error">
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className="">
                        <ReactQuill
                            theme="snow"
                            name="description"
                            onChange={formik.handleChange("description")}
                            // onBlur={formik.handleBlur("description")} // getting error
                            value={formik.values.description}
                        />
                    </div>
                    <div className="error">
                        {formik.touched.description &&
                            formik.errors.description}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Price"
                        name="price"
                        onChange={formik.handleChange("price")}
                        onBlur={formik.handleBlur("price")}
                        value={formik.values.price}
                    />
                    <div className="error">
                        {formik.touched.price && formik.errors.price}
                    </div>
                    <select
                        name="brand"
                        className="form-control py-3 mt-3"
                        onChange={formik.handleChange("brand")}
                        onBlur={formik.handleBlur("brand")}
                        value={formik.values.brand}
                    >
                        <option value="">Select Brand</option>
                        {brandState.map((i, j) => {
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
                        {formik.touched.brand && formik.errors.brand}
                    </div>

                    <select
                        name="category"
                        className="form-control py-3 mt-3"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}
                    >
                        <option value="">Select Category</option>
                        {categoryState.map((i, j) => {
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
                    
                    <select
                        name="tags"
                        className="form-control py-3 mt-3"
                        onChange={formik.handleChange("tags")}
                        onBlur={formik.handleBlur("tags")}
                        value={formik.values.tags}
                        id=""
                    >
                        <option
                            value=""
                            disabled
                        >
                            Select Category
                        </option>
                        <option value="featured">Featured</option>
                        <option value="popular">Popular</option>
                        <option value="special">Special</option>
                    </select>
                    <div className="error">
                        {formik.touched.tags && formik.errors.tags}
                    </div>

                    <Select
                        mode="multiple"
                        name="color"
                        allowClear
                        className="w-100"
                        placeholder="Select colors"
                        defaultValue={color}
                        onChange={(i) => handleColors(i)}
                        options={coloropt}
                    />
                    <div className="error">
                        {formik.touched.color && formik.errors.color}
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Product Quantity"
                        name="quantity"
                        onChange={formik.handleChange("quantity")}
                        onBlur={formik.handleBlur("quantity")}
                        value={formik.values.quantity}
                    />
                    <div className="error">
                        {formik.touched.quantity && formik.errors.quantity}
                    </div>
                    <div className="bg-white border-1 p-5 text-center">
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
                        className="btn btn-success border-0 rounded-3 my-5"
                        type="submit"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addproduct;
