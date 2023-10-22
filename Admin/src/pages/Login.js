import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

let schema = yup.object().shape({
    email: yup
        .string()
        .email("Email should be valid")
        .required("Email is Required"),
    password: yup.string().required("Password is Required"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(login(values));
            // dispatch(login({values}));     //  be careful here don't use this one
        },
    });
    const authState = useSelector((state) => state);

    const { user, isLoading, isError, isSuccess, message } = authState.auth;

    useEffect(() => {
        if (isSuccess) {
            navigate("admin");
        } else {
            navigate("");
        }
    }, [user, isLoading, isError, isSuccess]);
    return (
        <div
            className="py-5"
            style={{ background: "#ffd333", minHeight: "100vh" }}
        >
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Login</h3>
                <p className="text-center">
                    Login to your account to continue.
                </p>
                <div className="error text-center">
                    {message.message === "Rejected"
                        ? "You are not a Admin"
                        : ""}
                </div>
                <form
                    action=""
                    onSubmit={formik.handleSubmit}
                >
                    <CustomInput
                        type="text"
                        label="Email Address"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onBlur={formik.handleBlur("email")}
                        onChange={formik.handleChange("email")}
                    />
                    <div className="error mt-2">
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <CustomInput
                        type="password"
                        label="Password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onBlur={formik.handleBlur("password")}
                        onChange={formik.handleChange("password")}
                    />
                    <div className="error mt-2">
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                    </div>

                   {/*  <div className="mb-3 text-end ">
                        <Link
                            to="forgot-password "
                            className="text-dark text-decoration-none "
                        >
                            {" "}
                            Forgot Password?
                        </Link>
                    </div> */}
                    <button
                        style={{ background: "#ffd333" }}
                        type="submit"
                        className="border-0 rounded py-3 text-dark text-center text-decoration-none fs-5 fw-bold w-100"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
