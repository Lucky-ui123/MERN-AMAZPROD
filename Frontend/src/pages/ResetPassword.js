import React from "react";
import Meta from "./Meta";
import BreadCrumb from "./BreadCrumb";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../features/user/userSlice";

const loginSchema = yup.object({
  
    password: yup.string().required("Password is Required"),
});



const ResetPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,

        onSubmit: (values) => {
            dispatch(resetPassword({token:getToken, password:values.password}));
            navigate('/login')
        },
    });

    const location = useLocation();
    const getToken = location.pathname.split("/")[2];
    console.log(getToken);



    return (
        <>
            <Meta title={"Reset Password"} />
            <BreadCrumb title={"Reset Password"} />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center">Reset Password</h3>
                            <form
                                action="" onSubmit={formik.handleSubmit}
                                className="d-flex flex-column gap-15"
                            >
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
                              {/*   <CustomInput
                                    type="password"
                                    name="confirm password"
                                    placeholder="Confirm password"
                                /> */}

                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className="button">
                                            Submit
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

export default ResetPassword;
