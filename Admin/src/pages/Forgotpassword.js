import React from "react";
import CustomInput from "../components/CustomInput";

const  Forgotpassword = () => {
    return (
        <div
            className="py-5"
            style={{ background: "#ffd333", minHeight: "100" }}
        >
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center  title">Forgot Password</h3>
                <p className="text-center">
                    Please Enter your register email to get reset password mail.
                </p>
                <form action="">
                    <CustomInput
                        type="text"
                        label="Email Address"
                        id="email"
                    />
                  
                    <button
                        style={{ background: "#ffd333" }}
                        type="submit"
                        className="border-0 rounded py-3 fw-bold w-100"
                    >
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default  Forgotpassword;
