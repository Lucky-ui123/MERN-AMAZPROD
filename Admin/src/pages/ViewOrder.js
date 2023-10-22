import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, getOrders } from "../features/auth/authSlice";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const columns = [
    {
        title: "S.No",
        dataIndex: "key",
    },
    {
        title: "Product Name",
        dataIndex: "name",
    },
    {
        title: "Brand",
        dataIndex: "brand",
    },
    {
        title: "Count",
        dataIndex: "count",
    },
    {
        title: "Price",
        dataIndex: "price",
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Date",
        dataIndex: "date",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const ViewOrder = () => {
    const location = useLocation();
    const orderId = location.pathname.split("/")[3];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder(orderId));
    }, []);

   const getOrderState = useSelector(
        (state) => state?.auth?.singleOrder?.orders
    );
    console.log(getOrderState?.orderItems[0].product.price);
    console.log(getOrderState?.orderItems[0].totalPrice);
    const data1 = [];
    for (let i = 0; i < getOrderState?.orderItems?.length; i++) {
        data1.push({
            key: i + 1,
            name: getOrderState?.orderItems[i].product.title,
            brand: getOrderState?.orderItems[i]?.product.brand,
            count: getOrderState?.orderItems[i]?.quantity,
            price: getOrderState?.orderItems[i]?.price,
            color: getOrderState?.orderItems[i]?.color?.title,
            date: new Date(getOrderState?.createdAt).toLocaleString(),
            action: (
                <>
                    <Link
                        to="/"
                        className="ms-3 fs-4 text-danger"
                    >
                        <AiFillDelete />
                    </Link>
                </>
            ),
        });
    } 
    console.log(data1);
    return (
        <div>
            <h3 className="mb-4 title">View Order</h3>
            <div className="mb-4">
                <Table
                    columns={columns}
                    dataSource={data1}
                />
            </div>
        </div>
    );
};

export default ViewOrder;
// 1.04