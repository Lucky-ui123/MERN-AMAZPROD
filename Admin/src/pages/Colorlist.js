import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteAColor,
    getColors,
    resetState,
} from "../features/color/colorSlice";
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
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Colorlist = () => {
    const [open, setOpen] = useState(false);
    const [colorId, setColorId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setColorId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getColors());
        dispatch(resetState());
    }, []);
    const colorState = useSelector((state) => state.color.colors);
    const data1 = [];
    for (let i = 0; i < colorState.length; i++) {
        data1.push({
            key: i + 1,
            title: colorState[i].title,
            action: (
                <>
                    <Link
                        to={`/admin/color/${colorState[i]._id}`} //get the id of each color
                        className="ms-3 fs-4 text-danger"
                    >
                        <BiEdit />
                    </Link>
                    <button
                        className="ms-3 fs-4 text-danger bg-transparent border-0"
                        onClick={() => showModal(colorState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }

    const deleteColor = (e) => {
        dispatch(deleteAColor(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getColors());
        }, 100);
    };

    return (
        <div>
            <h3 className="mb-4 title">Colors</h3>
            <div className="mb-4">
                <Table
                    columns={columns}
                    dataSource={data1}
                />
            </div>
            <CustomModal
                hhideModal={hideModal}
                open={open}
                performAction={() => {
                    deleteColor(colorId);
                }}
                title="Are you sure you want to delete this Color?"
            />
        </div>
    );
};

export default Colorlist;
