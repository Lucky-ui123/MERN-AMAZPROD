import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    deleteABlogCategory,
    getBlogCategories,
    resetState,
} from "../features/blogCategory/blogCategorySlice";
import CustomModal from "../components/CustomModel";

const columns = [
    {
        title: "S.No",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "title",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Blogcatlist = () => {
    const [open, setOpen] = useState(false);
    const [blogCatId, setBlogCatId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setBlogCatId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getBlogCategories());
    }, [dispatch]);
    const getBlogCategoryState = useSelector(
        (state) => state.blogcategory.blogCategories
    );
    const data1 = [];
    for (let i = 0; i < getBlogCategoryState.length; i++) {
        data1.push({
            key: i + 1,
            title: getBlogCategoryState[i].title,
            action: (
                <>
                    <Link
                        to={`/admin/blog-category/${getBlogCategoryState[i]._id}`}
                        className="ms-3 fs-4 text-danger"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-4 text-danger bg-transparent border-0"
                        onClick={()=>showModal(getBlogCategoryState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    const deleteBlogCategory = (e) => {
        dispatch(deleteABlogCategory(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getBlogCategories());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Blog Categories</h3>
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
                    deleteBlogCategory(blogCatId);
                }}
                title="Are you sure you want to delete this Category?"
            />
        </div>
    );
};

export default Blogcatlist;
