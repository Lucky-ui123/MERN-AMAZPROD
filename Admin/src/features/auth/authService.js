import axios from "axios";
import { base_url } from "../../utils/base_url";

// for getting token
const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

export const config = {
    headers: {
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null
                ? getTokenFromLocalStorage.token
                : ""
        }`,
        Accept: "application/json",
    },
};

// admin login
const login = async (user) => {
    const response = await axios.post(`${base_url}user/admin-login`, user);
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data)); // for getting details
    }
    return response.data;
};

// get Orders
const getOrders = async () => {
    const response = await axios.get(`${base_url}user/getallorders`, config);
    return response.data;
};

// get Orders
const getOrder = async (id) => {
    const response = await axios.get(
        `${base_url}user/getaOrder/${id}`,
        config
    );
    return response.data;
};

// get Orders
const updateOrder = async (data) => {
    const response = await axios.put(
        `${base_url}user/updateOrder/${data.id}`, {status:data.status},
        config
    );
    return response.data;
};

// get Orders
const getMonthlyOrders = async (data) => {
    const response = await axios.get(
        `${base_url}user/getMonthWiseOrderIncome`,
        data
    );
    return response.data;
};

// get Orders
const getYearlyStats = async (data) => {
    const response = await axios.get(
        `${base_url}user/getYearlyTotalOrders`,data
    );
    return response.data;
};



const authService = {
    login,
    getOrder,
    getOrders,
    updateOrder,
    getMonthlyOrders,
    getYearlyStats
};

export default authService;
