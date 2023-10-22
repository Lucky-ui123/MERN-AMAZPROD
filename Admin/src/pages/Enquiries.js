import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
    deleteAEnquiry,
    getEnquiries,
    resetState,
    updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModel";

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
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Comment",
        dataIndex: "comment",
    },
    {
        title: "Mobile",
        dataIndex: "mobile",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Enquiries = () => {
    const [open, setOpen] = useState(false);
    const [enqId, setEnqId] = useState("");
    const showModal = (e) => {
        setOpen(true);
        setEnqId(e);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState());
        dispatch(getEnquiries());
    }, [dispatch]);
    const getEnquiryState = useSelector((state) => state.enquiry.enquiries);
    const data1 = [];
    for (let i = 0; i < getEnquiryState.length; i++) {
        data1.push({
            key: i + 1,
            name: getEnquiryState[i].name,
            email: getEnquiryState[i].email,
            comment: getEnquiryState[i].comment,
            mobile: getEnquiryState[i].mobile,
            status: (
                <>
                    <select
                        className="form-control form-select"
                        defaultValue={
                            getEnquiryState[i].status
                                ? getEnquiryState[i].status
                                : "Submitted"
                        }
                        onChange={(e) =>
                            setEnquiryStatus(
                                e.target.value,
                                getEnquiryState[i]._id
                            )
                        }
                    >
                        <option value="Submitted">Submitted</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </>
            ),
            action: (
                <>
                    <Link
                        to={`/admin/enquiries/${getEnquiryState[i]._id}`}
                        className="ms-3 fs-4 text-danger"
                    >
                        <AiOutlineEye />
                    </Link>
                    <button
                        className="ms-3 fs-4 text-danger bg-transparent border-0"
                        onClick={() => showModal(getEnquiryState[i]._id)}
                    >
                        <AiFillDelete />
                    </button>
                </>
            ),
        });
    }
    const setEnquiryStatus = (e, i) => {
        // console.log(e,i);
        const data = { id: i, enqData: e };
        dispatch(updateAEnquiry(data))
    };
    const deleteEnq = (e) => {
        // console.log(e);
        dispatch(deleteAEnquiry(e));
        setOpen(false);
        setTimeout(() => {
            dispatch(getEnquiries());
        }, 100); // refresh the page after delete the item
    };
    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
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
                    deleteEnq(enqId);
                }}
                title="Are you sure you want to delete this Enquiry?"
            />
        </div>
    );
};

export default Enquiries;
