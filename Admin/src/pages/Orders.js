import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAOrder } from "../features/auth/authSlice";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

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
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Amount",
        dataIndex: "amount",
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

const Orders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    const getOrderState = useSelector((state) => state.auth.orders.orders);
    const data1 = [];
    for (let i = 0; i < getOrderState?.length; i++) {
        data1.push({
            key: i + 1,
            name: getOrderState[i].user.firstname,
            product: (
                <Link to={`/admin/order/${getOrderState[i]._id}`}>
                    View Orders
                </Link>
            ),
            amount: getOrderState[i].totalPrice,
            date: new Date(getOrderState[i].createdAt).toLocaleString(),
            action: (
                <>
                   {/*  <Link
                        to="/"
                        className="ms-3 fs-4 text-danger"
                    >
                        <AiFillDelete />
                    </Link> */}

                    <select name="" defaultValue={getOrderState[i]?.orderStatus} onChange={(e)=>updateOrderStatus(getOrderState[i]?._id, e.target.value)} id="" className="form-control form-select">
                        <option value="Ordered" disabled selected>Ordered</option>
                        <option value="Processed">Processed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                    </select>
                </>
            ),
        });
    }
    // console.log(getOrderState);

    const updateOrderStatus = (a,b)=>{
        dispatch(updateAOrder({id:a, status:b}))
    }
    return (
        <div>
            <h3 className="mb-4 title">Orders</h3>
            <div className="mb-4">
                <Table
                    columns={columns}
                    dataSource={data1}
                />
            </div>
        </div>
    );
};

export default Orders;
