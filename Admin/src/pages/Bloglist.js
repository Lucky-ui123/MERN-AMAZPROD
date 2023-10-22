import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { deleteABlog, getBlogs, resetState } from "../features/blog/blogSlice";
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
        title: "Category",
        dataIndex: "category",
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Bloglist = () => {
    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setBlogId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getBlogs());
    }, [dispatch]);
    const getBlogState = useSelector((state) => state.blog.blogs);
    const data1 = [];
    for (let i = 0; i < getBlogState.length; i++) {
        data1.push({
            key: i+1,
            title: getBlogState[i].title,
            category: getBlogState[i].category,
            description: getBlogState[i].description,
            action: (
                <>
                    <Link
                        to={`/admin/blog/${getBlogState[i]._id}`}
                        className="ms-3 fs-4 text-danger"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-4 text-danger bg-transparent border-0"
                        onClick={() => showModal(getBlogState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    const deleteBlog = (e) => {
        dispatch(deleteABlog(e));
        setOpen(false)
        setTimeout(() => {
            dispatch(getBlogs())
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Blogs List</h3>
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
                    deleteBlog(blogId);
                }}
                title="Are you sure you want to delete this Blog?"
            />
        </div>
    );
};

export default Bloglist;
