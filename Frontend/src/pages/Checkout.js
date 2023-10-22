import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createAnOrder, deleteUserCart, getUserCart, resetState } from "../features/user/userSlice";

const shippingSchema = yup.object({
    firstName: yup.string().required("First Name is Required"),
    lastName: yup.string().required("Last Name is Required"),
    address: yup.string().required("Address Details are Required"),
    city: yup.string().required("City is Required"),
    state: yup.string().required("State is Required"),
    pincode: yup.number().required("Pincode is Required"),
    country: yup.string().required("Country is Required"),
    other: yup.number().required("Other is Required"),
});

const Checkout = () => {
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
    const navigate = useNavigate();
    const cartState = useSelector((state) => state?.auth?.cartProducts);
    // console.log(cartState);
    const authState = useSelector((state) => state.auth);

    const [totalAmount, setTotalAmount] = useState(null);
    const [shippingInfo, setShippingInfo] = useState(null);
    /* const [paymentInfo, setPaymentInfo] = useState({
        razorpayPaymentId: "",
        razorpayOrderId: "",
    }); */
    console.log(shippingInfo);
    const [cartProductState, setCartProductState] = useState([]);

    // total amount
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum =
                sum +
                Number(cartState[index].quantity) * cartState[index].price;
            setTotalAmount(sum);
            // console.log(sum);
        }
    }, [cartState]);

    useEffect(() => {
        dispatch(getUserCart(config2));
    }, []);

    useEffect(() => {
        if (
            authState?.orderedProduct?.order !== null &&
            authState?.orderedProduct?.success === true
        ) {
            navigate("/my-orders");
        }
    }, [authState]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            other: "",
            state: "",
            city: "",
            country: "",
            pincode: "",
        },
        validationSchema: shippingSchema,
        onSubmit:  (values) => {
            // alert(JSON.stringify(values));
             setShippingInfo(values);
             localStorage.setItem('address',JSON.stringify(values))
            // checkOutHandler();
            setTimeout(() => {
                checkOutHandler();
            }, 300);
        },
    });

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        let items = [];
        for (let index = 0; index < cartState?.length; index++) {
            items.push({
                product: cartState[index].productId._id,
                quantity: cartState[index].quantity,
                color: cartState[index].color._id,
                price: cartState[index].price,
            });
            setCartProductState(items);
        }
    }, []);
    // console.log(cartProductState);

    const checkOutHandler = async () => {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!res) {
            alert("Razorpay SDK failed to Load");
            return;
        }
        const result = await axios.post(
            "http://localhost:5000/api/user/order/checkout",
            { amount: totalAmount + 5 },
            config
        );
        if (!result) {
            alert("Something Went Wrong in Checkout!");
            return;
        }
        const { amount, id: order_id, currency } = result.data.order;
        const options = {
            key: "rzp_test_UivIRZLIstrpoC", // Enter the Key ID generated from the Dashboard
            amount: amount,
            currency: currency,
            name: "AmazProd Corp.",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    // razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(
                    "http://localhost:5000/api/user/order/paymentVerification",
                    data,
                    config
                );
                // console.log(result);
                /*  setPaymentInfo({
                    razorpayPaymentId: result.razorpay_payment_id,
                    razorpayOrderId: result.razorpay_order_id,
                }); */

                // setTimeout(() => {
                    dispatch(
                        createAnOrder({
                            totalPrice: totalAmount,
                            totalPriceAfterDiscount: totalAmount,
                            orderItems: cartProductState,
                            paymentInfo: result.data,
                            shippingInfo:JSON.parse(localStorage.getItem('address')),
                            /*    ? {
                                  firstName: shippingInfo.firstName,
                                  lastName: shippingInfo.lastName,
                                  address: shippingInfo.address,
                                  state: shippingInfo.state,
                                  city: shippingInfo.city,
                                  country: shippingInfo.country,
                                  pincode: shippingInfo.pincode,
                                  other: "Additional shipping info", // Provide a default value for 'other'
                              }
                             : null, // Set to null or provide a default value if shippingInfo is null*/
                        })
                    );
                // }, 300);
                dispatch(deleteUserCart(config2))
                localStorage.removeItem('address')
                // reset all 
                dispatch(resetState())
            },
            prefill: {
                name: "Amaz Prod",
                email: "amazprod@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "AmazProd Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
    // console.log(shippingInfo, paymentInfo);
    // console.log(totalAmount);
    return (
        <>
            <Container class1="checkout-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-7">
                        <div className="checkout-left-data">
                            <h3 className="website-name">Amaz Prod</h3>
                            <nav
                                style={{ "--bs-breadcrumb-divider": ">" }}
                                aria-label="breadcrumb"
                            >
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link
                                            to="/cart"
                                            className="text-darl total-price"
                                        >
                                            Cart
                                        </Link>
                                    </li>
                                    &nbsp; /
                                    <li
                                        className="breadcrumb-item active total-price"
                                        aria-current="page"
                                    >
                                        Information
                                    </li>
                                    &nbsp; /
                                    <li className="breadcrumb-item active total-price">
                                        Information
                                    </li>
                                    &nbsp; /
                                    <li
                                        className="breadcrumb-item active total-price"
                                        aria-current="page"
                                    >
                                        Payment
                                    </li>
                                </ol>
                            </nav>
                            <h4 className="title total">Contact Information</h4>
                            <p className="user-details total">
                                Lingesh Chary(lngshlucky@gmail.com)
                            </p>
                            <h4 className="mb-3">Shipping Address</h4>
                            <form
                                onSubmit={formik.handleSubmit}
                                action=""
                                className="d-flex gap-15 flex-wrap justify-content-between"
                            >
                                <div className="w-100">
                                    <select
                                        name="country"
                                        className="form-control form-select"
                                        id=""
                                        onChange={formik.handleChange(
                                            "country"
                                        )}
                                        onBlur={formik.handleBlur("country")}
                                        value={formik.values.country}
                                    >
                                        <option
                                            value=""
                                            selected
                                            // disabled
                                        >
                                            Select Country
                                        </option>{" "}
                                        <option value="India">India</option>
                                    </select>{" "}
                                    <div className="errors ms-1 my-1">
                                        {formik.touched.country &&
                                            formik.errors.country}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        name="firstName"
                                        onChange={formik.handleChange(
                                            "firstName"
                                        )}
                                        onBlur={formik.handleBlur("firstName")}
                                        value={formik.values.firstName}
                                    />
                                    <div className="errors ms-1 my-1">
                                        {formik.touched.firstName &&
                                            formik.errors.firstName}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Last Name"
                                        name="lastName"
                                        onChange={formik.handleChange(
                                            "lastName"
                                        )}
                                        onBlur={formik.handleBlur("lastName")}
                                        value={formik.values.lastName}
                                    />
                                    <div className="errors ms-1 my-1 ">
                                        {formik.touched.lastName &&
                                            formik.errors.lastName}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Address"
                                        name="address"
                                        onChange={formik.handleChange(
                                            "address"
                                        )}
                                        onBlur={formik.handleBlur("address")}
                                        value={formik.values.address}
                                    />
                                    <div className="errors ms-1 my-1">
                                        {formik.touched.address &&
                                            formik.errors.address}
                                    </div>
                                </div>
                                <div className="w-100">
                                    <input
                                        type="text"
                                        placeholder="Apartment, Suite ,etc"
                                        className="form-control"
                                        value={formik.values.other}
                                        onChange={formik.handleChange("other")}
                                        onBlur={formik.handleBlur("other")}
                                        name="other"
                                    />
                                    <div className="errors ms-2 my-1">
                                        {formik.touched.other &&
                                            formik.errors.other}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="City"
                                        name="city"
                                        onChange={formik.handleChange("city")}
                                        onBlur={formik.handleBlur("city")}
                                        value={formik.values.city}
                                    />
                                    <div className="errors ms-1 my-1">
                                        {formik.touched.city &&
                                            formik.errors.city}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <select
                                        name="state"
                                        id=""
                                        className="form-control form-select"
                                        onChange={formik.handleChange("state")}
                                        onBlur={formik.handleBlur("state")}
                                        value={formik.values.state}
                                    >
                                        <option
                                            value=""
                                            selected
                                            // disabled
                                        >
                                            {" "}
                                            Select State
                                        </option>
                                        <option value="Telangana">
                                            Telangana
                                        </option>
                                    </select>
                                    <div className="errors ms-1 my-1">
                                        {formik.touched.state &&
                                            formik.errors.state}
                                    </div>
                                </div>
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Pincode"
                                        name="pincode"
                                        onChange={formik.handleChange(
                                            "pincode"
                                        )}
                                        onBlur={formik.handleBlur("pincode")}
                                        value={formik.values.pincode}
                                    />
                                    <div className="errors ms-1 my-1">
                                        {formik.touched.pincode &&
                                            formik.errors.pincode}
                                    </div>
                                </div>
                                <div className="w-100 ">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link
                                            to="/cart"
                                            className="text-dark"
                                        >
                                            {" "}
                                            <BiArrowBack className="me-2" />{" "}
                                            Return to Cart
                                        </Link>
                                        <Link
                                            to="/cart"
                                            className="button"
                                        >
                                            Continue Shipping
                                        </Link>
                                        <button
                                            className="button"
                                            type="submit"
                                            // onClick={checkOutHandler}
                                        >
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="border-bottom py-4">
                            {cartState &&
                                cartState?.map((item, index) => {
                                    return (
                                        <div
                                            className="d-flex gap-10 align-items-center"
                                            key={index}
                                        >
                                            <div className="w-75 d-flex gap-10">
                                                <div className="w-25 position-relative">
                                                    <span
                                                        style={{
                                                            top: "-10px",
                                                            right: "-5px",
                                                        }}
                                                        className="badge bg-danger text-white rounded-circle position-absolute"
                                                    >
                                                        {item?.quantity}
                                                    </span>
                                                    <img
                                                        width={100}
                                                        height={100}
                                                        src={
                                                            item?.productId
                                                                ?.images[0]?.url
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div>
                                                    <h6 className="title-pric">
                                                        {item?.productId?.title}
                                                    </h6>
                                                    <p
                                                        className="total-pric" /* style={{backgroundColor:item?.color?.title}} */
                                                    >
                                                        {item?.color?.title}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h5 className="total">
                                                    ${" "}
                                                    {item?.price *
                                                        item?.quantity}
                                                </h5>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className="border-bottom py-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="total">Subtotal</p>
                                <p className="total-price">
                                    $ {totalAmount ? totalAmount : "0"}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="mb-0 total">Shipping</p>
                                <p className="mb-0 total-price">$ 5</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                            <h4 className="total">Total</h4>
                            <h5 className="total-price">
                                $ {totalAmount ? totalAmount + 5 : "0"}
                            </h5>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Checkout;
