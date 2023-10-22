import React, { useEffect, useState } from "react";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    getMonthlyData,
    getOrders,
    getYearlyData,
} from "../features/auth/authSlice";

const columns = [
    {
        title: "S.No",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Product Count",
        dataIndex: "product",
    },
    {
        title: "Total Price",
        dataIndex: "price",
    },
    {
        title: "Total Price After Discount",
        dataIndex: "dprice",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
];

const Dashboard = () => {

    const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;


 const config3 = {
    headers: {
        Authorization: `Bearer ${
            getTokenFromLocalStorage !== null
                ? getTokenFromLocalStorage.token
                : ""
        }`,
        Accept: "application/json",
    },
};


    let monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dispatch = useDispatch();
    const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
    const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
    const orderState = useSelector((state) => state?.auth?.orders?.orders);
    const [dataMonthly, setDataMonthly] = useState([]);
    const [dataMonthlySales, setDataMonthlySales] = useState([]);
    const [orderData, setOrderData] = useState([])
    // console.log(orderData);
    // console.log(orderState);

    useEffect(() => {
        dispatch(getMonthlyData(config3));
        dispatch(getYearlyData(config3));
        dispatch(getOrders(config3));
    }, []);

    useEffect(() => {
        let data = [];
        let monthlyOrderCount = [];
        for (let index = 0; index < monthlyDataState?.length; index++) {
            const element = monthlyDataState[index];
            data.push({
                type: monthNames[element?._id?.month],
                income: element?.amount,
            });
            monthlyOrderCount.push({
                type: monthNames[element?._id?.month],
                sales: element?.count,
            });
        }
        // console.log(data);
        setDataMonthly(data);
        setDataMonthlySales(monthlyOrderCount);

        const data1 = [];
        for (let i = 0; i < orderState?.length; i++) {
            data1.push({
                key: i+1,
                name: orderState[i].user.firstname  + orderState[i].user.lastname,
                product: orderState[i].orderItems?.length,
                price:orderState[i].totalPrice,
                dprice:orderState[i].totalPriceAfterDiscount,
                status:orderState[i].orderStatus,
            });
        }
        setOrderData(data1)

    }, [orderState, monthlyDataState]);

    /*   const data = [
    
        {
            type: "Jan",
            sales: 38,
        },
        {
            type: "Feb",
            sales: 52,
        },
        {
            type: "Mar",
            sales: 61,
        },
        {
            type: "Apr",
            sales: 145,
        },
        {
            type: "May",
            sales: 48,
        },
        {
            type: "Jun",
            sales: 38,
        },
        {
            type: "Jul",
            sales: 38,
        },
        {
            type: "Aug",
            sales: 38,
        },
        {
            type: "Sep",
            sales: 38,
        },
        {
            type: "Oct",
            sales: 38,
        },
        {
            type: "Nov",
            sales: 38,
        },
        {
            type: "Dec",
            sales: 38,
        },
    ]; */

    const config = {
        data: dataMonthly,
        xField: "type",
        yField: "income",
        color: ({ type }) => {
            return "#ffd333";
        },
        label: {
            position: "middle",
            // 'top', 'bottom', 'middle',
            style: {
                fill: "#FFFFFF",
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Income",
            },
        },
    };

    const config2 = {
        data: dataMonthlySales,
        xField: "type",
        yField: "sales",
        color: ({ type }) => {
            return "#ffd333";
        },
        label: {
            position: "middle",
            // 'top', 'bottom', 'middle',
            style: {
                fill: "#FFFFFF",
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: "Month",
            },
            sales: {
                alias: "Sales",
            },
        },
    };
    return (
        <div>
            <h3 className="mb-4 title">Dashboard</h3>
            <div className="d-flex justify-content-between align-items-ceter gap-3">
                <div className="d-flex bg-white p-3 rounded-3 justify-content-between align-items-end flex-grow-1">
                    <div>
                        <p className="desc">Total Income</p>
                        <h4 className="mb-0 sub-title">
                            ₹ {yearlyDataState && yearlyDataState[0]?.amount}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red">
                            <GoArrowDownRight className="fs-5" /> 32%
                        </h6>
                        <p className="mb-0 desc">
                            Income in Last Year from Today{" "}
                        </p>
                    </div>
                </div>
                <div className="d-flex bg-white p-3 rounded-3 justify-content-between align-items-end flex-grow-1">
                    <div>
                        <p className="desc">Total Sales</p>
                        <h4 className="mb-0 sub-title">
                            {yearlyDataState && yearlyDataState[0].count}
                        </h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="green">
                            <GoArrowUpRight className="fs-5" /> 32%{" "}
                        </h6>
                        <p className="mb-0 desc">
                            Sales in Last Year from Today
                        </p>
                    </div>
                </div>
                {/*  <div className="d-flex bg-white p-3 rounded-3 justify-content-between align-items-end flex-grow-1">
                    <div>
                        <p className="desc">Total</p>{" "}
                        <h4 className="mb-0 sub-title">$ 1100</h4>
                    </div>
                    <div className="d-flex flex-column align-items-end">
                        <h6 className="red">
                            <GoArrowDownRight className="fs-5" /> 32%{" "}
                        </h6>
                        <p className="mb-0 desc">Compared To April 2022</p>
                    </div>
                </div> */}
            </div>
            <div className="d-flex justify-content-between gap-3">
                <div className="mt-4 flex-grow-1 w-50">
                    <h3 className="mb-4 title">Income Statics</h3>
                    <div>
                        <Column {...config} />
                    </div>
                </div>
                <div className="mt-4 flex-grow-1 w-50">
                    <h3 className="mb-4 title">Sales Statics</h3>
                    <div>
                        <Column {...config2} />
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h3 className="mb-4 title">Recent Orders</h3>
                <div>
                    <Table
                        columns={columns}
                        dataSource={orderData}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
