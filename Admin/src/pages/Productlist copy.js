import React, { useEffect } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

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
        title: "Brand",
        dataIndex: "brand",
        sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => a.category.length - b.category.length,
    },
    {
        title: "Price",
        dataIndex: "price",
        sorter: (a, b) => a.price.length - b.price.length,
    },
    {
        title: "Color",
        dataIndex: "color",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Productlist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);
    const productState = useSelector((state) => state.product.products);
    const data1 = [];
    for (let i = 0; i < productState.length; i++) {

/*         const colorValue = // so for getting color value use this
            productState[i].color.length > 0
                ? productState[i].color[0].color
                : "No Color"; */

        data1.push({
            key: i + 1,
            title: productState[i].title,
            category: productState[i].category,
            brand: productState[i].brand,
            color: productState[i].color,
            // color: colorValue,   // instead of this
            price: `$ ${productState[i].price}`,
            action: (
                <>
                    <Link
                        to="/"
                        className="ms-3 fs-4 text-danger"
                    >
                        {/* <span> */}
                            {" "}
                            <BiEdit />
                        {/* </span> */}
                    </Link>
                    <Link
                        to="/"
                        className="ms-3 fs-4 text-danger"
                    >
                        {/* <span> */}
                            {" "}
                            <AiFillDelete />
                        {/* </span> */}
                    </Link>
                </>
            ),
        });
    }

    return (
        <div>
            <h3 className="mb-4 title">Produts</h3>
            <div className="mb-4">
                <Table
                    columns={columns}
                    dataSource={data1}
                />
            </div>
        </div>
    );
};

export default Productlist;
