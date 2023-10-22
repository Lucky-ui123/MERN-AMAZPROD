import React from "react";
import CustomInput from "../components/CustomInput";

const  Resetpassword = () => {
    return (
        <div
            className="py-5"
            style={{ background: "#ffd333", minHeight: "100" }}
        >
            <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className="text-center title">Reset Password</h3>
                <p className="text-center">
                    Please Enter your new password.
                </p>
                <form action="">
                    <CustomInput
                        type="password"
                        label="New Password"
                        id="password"
                    />
                    <CustomInput
                        type="password"
                        label="Confirm Password"
                        id="password"
                    />
                  
                    <button
                        style={{ background: "#ffd333" }}
                        type="submit"
                        className="border-0 rounded py-3 text-hite fw-bold w-100"
                    >
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default  Resetpassword;
