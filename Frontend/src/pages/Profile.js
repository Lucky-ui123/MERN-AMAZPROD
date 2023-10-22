import React, { useState } from "react";
import BreadCrumb from "./BreadCrumb";
import Container from "../components/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = yup.object({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name is Required"),
    email: yup
        .string()
        .email("Email Should be valid")
        .required("Email Address is Required"),
    mobile: yup.string().required("Mobile Number is Required"),
});

const Profile = () => {
    const getTokenFromLocalStorage = localStorage.getItem("customer")
        ? JSON.parse(localStorage.getItem("customer"))
        : null;

    const config2 = {
        headers: {
            Authorization: `Bearer ${
                getTokenFromLocalStorage !== null
                    ? getTokenFromLocalStorage.token
                    : ""
            }`,
            Accept: "application/json",
        },
    };

    const dispatch = useDispatch();
    const userState = useSelector((state) => state.auth.user);
    const [edit, setEdit] = useState(true);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: userState?.firstname,
            lastname: userState?.lastname,
            email: userState?.email,
            mobile: userState?.mobile,
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile({ data: values, config2: config2 }));
            setEdit(true);
        },
    });
    return (
        <>
            <BreadCrumb title="My Profile" />
            <Container claas1="cart-wrapper home-wrapper-2 py-5">
                <div className="row pb-5">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3>Update Profile</h3>
                            <FiEdit
                                className="fs-4"
                                onClick={() => setEdit(false)}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label
                                    htmlFor="example1"
                                    className="form-label"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="example1"
                                    name="firstname"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter firstname"
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                    disabled={edit}
                                />
                                <div className="errors">
                                    {formik.touched.firstname &&
                                        formik.errors.firstname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="example2"
                                    className="form-label"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    id="example2"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter lastname"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                    disabled={edit}
                                />
                                <div className="errors">
                                    {formik.touched.lastname &&
                                        formik.errors.lastname}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    disabled={edit}
                                />
                                <div className="errors">
                                    {formik.touched.email &&
                                        formik.errors.email}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="example3"
                                    className="form-label"
                                >
                                    Mobile Number
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="mobile"
                                    id="example3"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter mobile number"
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                    disabled={edit}
                                />
                                <div className="errors">
                                    {formik.touched.mobile &&
                                        formik.errors.mobile}
                                </div>
                            </div>

                            {edit === false && (
                                <button
                                    type="submit"
                                    className="btn btn-primary mb-3"
                                >
                                    Save
                                </button>
                            )}
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Profile;
