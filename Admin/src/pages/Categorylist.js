import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteAProductCategory,
    getProductCategories,
    resetState,
} from "../features/prodCategory/prodCategorySlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModel";

const columns = [
    {
        title: "S.No",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "title",
        sorter: (a, b) => a.title.length - b.title.length,
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Categorylist = () => {
    const [open, setOpen] = useState(false);
    const [prodCatId, setProdCatId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setProdCatId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getProductCategories());
    }, [dispatch]);
    const prodCategoryState = useSelector(
        (state) => state.prodCategory.prodCategories
    );

    const data1 = [];
    for (let i = 0; i < prodCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            title: prodCategoryState[i].title,
            action: (
                <>
                    <Link
                        to={`/admin/category/${prodCategoryState[i]._id}`}
                        className="ms-3 fs-4 text-danger"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-4 text-danger bg-transparent border-0"
                        onClick={() => showModal(prodCategoryState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    const deleteCategory = (e) => {
        dispatch(deleteAProductCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getProductCategories());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Product Categories</h3>
            <div className="mb-4">
                <Table
                    columns={columns}
                    dataSource={data1}
                />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteCategory(prodCatId);
                }}
                title="Are you sure you want to delete this Product Category"
            />
        </div>
    );
};

export default Categorylist;
