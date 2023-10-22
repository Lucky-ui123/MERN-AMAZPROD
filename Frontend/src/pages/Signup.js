import React, { useEffect } from "react";
import Meta from "./Meta";
import BreadCrumb from "./BreadCrumb";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { registerUser } from "../features/user/userSlice";

const signUpSchema = yup.object({
    firstname: yup.string().required("First Name is Required"),
    lastname: yup.string().required("Last Name is Required"),
    email: yup
        .string()
        .email("Email Should be valid")
        .required("Email Id ss Required"),
    mobile: yup.string().required("Mobile No is Required"),
    password: yup.string().required("Password is Required"),
});

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const authState = useSelector(state=>state.auth)
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
        },
        validationSchema: signUpSchema,

        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(registerUser(values));
            // console.log(values);
        },
    });

    useEffect(()=>{
        if(authState.createdUser !== null && authState.isError === false){
            navigate('/login')
        }
    },[authState])

    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title={"Sign Up"} />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center">Create Account</h3>
                            <form
                                onSubmit={formik.handleSubmit}
                                action=""
                                className="d-flex flex-column gap-15"
                            >
                                <CustomInput
                                    type="text"
                                    name="firstname"
                                    placeholder="First Name"
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                    value={formik.values.firstname}
                                />
                                <div className="error">
                                    {formik.touched.firstname &&
                                        formik.errors.firstname}
                                </div>

                                <CustomInput
                                    type="text"
                                    name="lastname"
                                    placeholder="Last Name"
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                    value={formik.values.lastname}
                                />
                                <div className="error">
                                    {formik.touched.lastname &&
                                        formik.errors.lastname}
                                </div>

                                <CustomInput
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    value={formik.values.email}
                                />
                                <div className="error">
                                    {formik.touched.email &&
                                        formik.errors.email}
                                </div>

                                <CustomInput
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    onChange={formik.handleChange("mobile")}
                                    onBlur={formik.handleBlur("mobile")}
                                    value={formik.values.mobile}
                                />
                                <div className="error">
                                    {formik.touched.mobile &&
                                        formik.errors.mobile}
                                </div>

                                <CustomInput
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    value={formik.values.password}
                                />
                                <div className="error">
                                    {formik.touched.password &&
                                        formik.errors.password}
                                </div>

                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button
                                            className="button"
                                            type="submit"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Signup;
