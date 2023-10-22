import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
    AiOutlineLogout,
} from "react-icons/ai";
import {RiCouponLine} from 'react-icons/ri'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BiCategoryAlt } from "react-icons/bi";
import { FaBloggerB, FaClipboardList } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { IoLogoAppleAr } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout > {/* onContextMenu={(e) => e.preventDefault()} // it'll disabled the 'right click' */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className="logo">
                    <h2 className="text-dark fs-5 text-center ">
                        <span className="sm-logo">
                            <IoLogoAppleAr />
                        </span>
                        <span className="lg-logo">Amaz Prod</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[""]}
                    onClick={({ key }) => {
                        // it is for buttons
                        if (key === "signout") {
                            localStorage.clear()
                            window.location.reload()
                        } else {
                            navigate(key);
                        }
                    }}
                    items={[
                        {
                            key: "",
                            icon: <AiOutlineDashboard className="fs-5" />,
                            label: "Dashboard",
                        },
                        {
                            key: "customers",
                            icon: <AiOutlineUser className="fs-5" />,
                            label: "Customers",
                        },
                        {
                            key: "catalog",
                            icon: <AiOutlineShoppingCart className="fs-5" />,
                            label: "Catalog",
                            children: [
                                {
                                    key: "product",
                                    icon: (
                                        <AiOutlineShoppingCart className="fs-5" />
                                    ),
                                    label: "Add Product",
                                },
                                {
                                    key: "product-list",
                                    icon: (
                                        <AiOutlineShoppingCart className="fs-5" />
                                    ),
                                    label: "Product List",
                                },
                                {
                                    key: "brand",
                                    icon: <SiBrandfolder className="fs-5" />,
                                    label: "Brand",
                                },
                                {
                                    key: "brand-list",
                                    icon: <SiBrandfolder className="fs-5" />,
                                    label: "Brand List",
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className="fs-5" />,
                                    label: "Category",
                                },
                                {
                                    key: "category-list",
                                    icon: <BiCategoryAlt className="fs-5" />,
                                    label: "Category List",
                                },
                                {
                                    key: "color",
                                    icon: (
                                        <AiOutlineBgColors className="fs-5" />
                                    ),
                                    label: "Color",
                                },
                                {
                                    key: "color-list",
                                    icon: (
                                        <AiOutlineBgColors className="fs-5" />
                                    ),
                                    label: "Color List",
                                },
                            ],
                        },
                        {
                            key: "orders",
                            icon: <FaClipboardList className="fs-5" />,
                            label: "Orders",
                        },
                        {
                            key: "marketing",
                            icon: <RiCouponLine className="fs-5" />,
                            label: "Marketing",
                            children: [
                                {
                                    key: "coupon",
                                    icon: <ImBlog className="fs-5" />,
                                    label: "Add Coupon",
                                },
                                {
                                    key: "coupon-list",
                                    icon: <RiCouponLine className="fs-5" />,
                                    label: "Coupon List",
                                },
                            ],
                        },
                        {
                            key: "blogs",
                            icon: <FaBloggerB className="fs-5" />,
                            label: "Blogs",
                            children: [
                                {
                                    key: "blog",
                                    icon: <ImBlog className="fs-5" />,
                                    label: "Add Blog",
                                },
                                {
                                    key: "blog-list",
                                    icon: <FaClipboardList className="fs-5" />,
                                    label: "Blog List",
                                },
                                {
                                    key: "blog-category",
                                    icon: <ImBlog className="fs-5" />,
                                    label: "Add Blog Category",
                                },
                                {
                                    key: "blog-category-list",
                                    icon: <FaClipboardList className="fs-5" />,
                                    label: "Blog Category List",
                                },
                            ],
                        },
                        {
                            key: "enquiries",
                            icon: <FaClipboardList className="fs-5" />,
                            label: "Enquiries",
                        },
                        {
                            key: "signout",
                            icon: <AiOutlineLogout className="fs-5" />,
                            label: "Sign Out",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className="d-flex justify-content-between ps-3 pe-3"
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-4 align-items-center">
                        <div className="position-relative">
                            <IoIosNotifications className="fs-3" />
                            <span className="badge bg-danger rounded-circle position-absolute">
                                3
                            </span>
                        </div>
                        <div className="d-flex gap-3 align-items-center dropdown">
                            <div>
                                <img
                                    width={32}
                                    height={32}
                                    src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                                    alt=""
                                />
                            </div>
                            <div
                                // className="btn btn-secondary dropdown-toggle"
                                role="button"
                                id="dropdownMenuLink"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <h5 className="mb-0">Lingesh Chary</h5>
                                <p className="mb-0">lngshlucky@gmail.com</p>
                            </div>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink"
                            >
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        style={{
                                            height: "auto",
                                            lineHeight: "20px",
                                        }}
                                        to="/"
                                    >
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="dropdown-item"
                                        style={{
                                            height: "auto",
                                            lineHeight: "20px",
                                        }}
                                        to="/"
                                    >
                                        Signout
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        // pauseOnHover
                        theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
