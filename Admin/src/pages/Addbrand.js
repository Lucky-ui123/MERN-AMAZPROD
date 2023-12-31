import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import {
    createBrand,
    getABrand,
    resetState,
    updateABrand,
} from "../features/brand/brandSlice";

let schema = yup.object().shape({
    title: yup.string().required("Brand is Required"),
});

const Addbrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation(); // for getting the id here
    const getBrandId = location.pathname.split("/")[3]; // we have to split the id url, so it'll gives an array

    const newBrand = useSelector((state) => state.brand);
    const {
        isSuccess,
        isError,
        isLoading,
        createdBrand,
        brandName,
        updatedBrand,
    } = newBrand;

    useEffect(() => {
        if (getBrandId !== undefined) {
            dispatch(getABrand(getBrandId));
            // formik.values.title = brandName;
        } else {
            dispatch(resetState());
        }
    }, [getBrandId]);

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Brand Added Successfully");
        }
        if (isSuccess && updatedBrand) {
            toast.success("Brand Updated Successfully");
            navigate("/admin/brand-list");
        }
        if (isError) {
            toast.error("Something went wrong!");
        }
    }, [isSuccess, isError, isLoading]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "" || brandName,
        },
        validationSchema: schema,
        onSubmit: (values) => {
            if (getBrandId !== undefined) {
                const data = { id: getBrandId, brandData: values };
                dispatch(updateABrand(data));
            } else {
                dispatch(createBrand(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());
                }, 3000);
            }
        },
    });

    return (
        <div>
            {/* <h3 className="mb-4 title">Add Brand</h3> */}
            <h3 className="mb-4 title">
                {getBrandId !== undefined ? "Edit" : "Add"} Brand
            </h3>
            <div>
                <form
                    action=""
                    onSubmit={formik.handleSubmit}
                >
                    <CustomInput
                        type="text"
                        name="title"
                        id="brand"
                        label="Enter Brand"
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
                        {getBrandId !== undefined ? "Edit" : "Add"} Brand
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Addbrand;
