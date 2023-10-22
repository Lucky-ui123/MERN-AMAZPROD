import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProducts from "../components/SpecialProducts";
import Container from "../components/Container";
import { services } from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";
import { getAllProducts } from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import watch1 from "../images/watch-1.png";
import prodcompare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addcart from "../images/add-cart.svg";
import { addToWishlist } from "../features/products/productSlice";

const Home = () => {
    const dispatch = useDispatch();
    const blogState = useSelector((state) => state?.blog?.blog);
    const productState = useSelector((state) => state?.product?.products);
    const navigate = useNavigate();
    // console.log(productState);
    useEffect(() => {
        getallblogs();
        getProducts();
    }, []);

    const getallblogs = () => {
        dispatch(getAllBlogs());
    };

    const getProducts = () => {
        dispatch(getAllProducts());
    };

    const addToWish = (id) => {
        // alert(id)
        dispatch(addToWishlist(id));
    };
    return (
        <>
            <Container class1="home-wrapper-1 py-5">
                <div className="row">
                    <div className="col-6">
                        <div className="main-banner position-relative">
                            <img
                                src="images/main-banner-1.jpg"
                                className="img-fluid rounded-3"
                                alt="main banner"
                            />
                            <div className="main-banner-content position-absolute">
                                <h4>SUPERCHARGED FOR PROS.</h4>
                                <h5>iPad S13+ Pro.</h5>
                                <p>From $999.00 or $41.62/mo.</p>
                                <Link className="button">BUY NOW</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="d-flex flex-wrap gap-10 justify-content-between aligh-items-center">
                            <div className="small-banner position-relative ">
                                <img
                                    src="images/catbanner-01.jpg"
                                    className="img-fluid rounded-3"
                                    alt="main banner"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>BEST FOR PROS.</h4>
                                    <h5>iPad S13+ Pro.</h5>
                                    <p>
                                        From $999.00 <br /> or $41.62/mo.
                                    </p>
                                </div>
                            </div>

                            <div className="small-banner position-relative ">
                                <img
                                    src="images/catbanner-02.jpg"
                                    className="img-fluid rounded-3"
                                    alt="main banner"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy IPad</h5>
                                    <p>
                                        From $999.00 <br /> or $41.62/mo.
                                    </p>
                                </div>
                            </div>

                            <div className="small-banner position-relative ">
                                <img
                                    src="images/catbanner-03.jpg"
                                    className="img-fluid rounded-3"
                                    alt="main banner"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>NEW PROS.</h4>
                                    <h5>iPad S13+ Pro.</h5>
                                    <p>
                                        From $999.00 <br /> or $41.62/mo.
                                    </p>
                                </div>
                            </div>

                            <div className="small-banner position-relative ">
                                <img
                                    src="images/catbanner-04.jpg"
                                    className="img-fluid rounded-3"
                                    alt="main banner"
                                />
                                <div className="small-banner-content position-absolute">
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>Buy IPad</h5>
                                    <p>
                                        From $999.00 <br /> or $41.62/mo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="services d-flex align-items-center justify-content-between">
                            {services?.map((i, j) => {
                                return (
                                    <div
                                        className="d-flex align-items-center gap-15"
                                        key={j}
                                    >
                                        <img
                                            src={i.image}
                                            alt="services"
                                        />
                                        <div>
                                            <h6> {i.title} </h6>
                                            <p className="mb-0">
                                                {" "}
                                                {i.tagline}{" "}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="categories d-flex justify-content-between flex-wrap align-items-center">
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/camera.jpg"
                                    alt="camera"
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Smart Tv</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/tv.jpg"
                                    alt="camera"
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Headphone</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/headphone.jpg"
                                    alt="camera"
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Laptops</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/laptop.jpg"
                                    alt="camera"
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/camera.jpg"
                                    alt="camera"
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Smart Tv</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/tv.jpg"
                                    alt="camera"
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Headphone</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/headphone.jpg"
                                    alt="camera"
                                />
                            </div>
                            <div className="d-flex align-items-center">
                                <div>
                                    <h6>Laptops</h6>
                                    <p>10 Items</p>
                                </div>
                                <img
                                    src="images/laptop.jpg"
                                    alt="camera"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="featured-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Featured Collection</h3>
                    </div>
                    {productState &&
                        productState?.map((item, index) => {
                            if (item.tags === "featured") {
                                return (
                                    <div
                                        key={index}
                                        className="col-3"
                                    >
                                        <div
                                            // to="/product/:id"
                                            className="product-card position-relative"
                                        >
                                            <div className="wishlist-icon position-absolute">
                                                <button
                                                    className="border-0 bg-transparent"
                                                    onClick={(e) => {
                                                        addToWish(item?._id);
                                                    }}
                                                >
                                                    <img
                                                        src={wish}
                                                        alt="wishlist"
                                                    />
                                                </button>
                                            </div>
                                            <div className="product-image">
                                                {item?.images &&
                                                    item.images[0] && (
                                                        <img
                                                            src={
                                                                item.images[0]
                                                                    .url
                                                            }
                                                            className="img-fluid mx-auto"
                                                            alt="product image"
                                                            width={160}
                                                        />
                                                    )}
                                                <img
                                                    src={watch1}
                                                    className="img-fluid mx-auto"
                                                    alt="product image"
                                                    width={160}
                                                />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">
                                                    {item?.brand}
                                                </h6>
                                                <h5 className="product-title">
                                                    {item?.title}
                                                </h5>
                                                <ReactStars
                                                    count={5}
                                                    /* onChange={ratingChanged} */ value={item?.totalrating.toString()}
                                                    edit={false}
                                                    size={20}
                                                    activeColor="#ffd700"
                                                />

                                                <p className="price">
                                                    ${item?.price}
                                                </p>
                                            </div>
                                            <div className="action-bar position-absolute">
                                                <div className="d-flex flex-column gap-15">
                                                  {/*   <button className="border-0 bg-transparent">
                                                        <img
                                                            src={prodcompare}
                                                            alt="compare"
                                                        />
                                                    </button> */}
                                                    <button className="border-0 bg-transparent">
                                                        <img
                                                            onClick={() =>
                                                                navigate(
                                                                    "/product/" +
                                                                        item?._id
                                                                )
                                                            }
                                                            src={view}
                                                            alt="compare"
                                                        />
                                                    </button>
                                                    {/* <button className="border-0 bg-transparent">
                                                        <img
                                                            src={addcart}
                                                            alt="compare"
                                                        />
                                                    </button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                </div>
            </Container>

            <Container class1="famous-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/laptop-full.png"
                                className="black"
                                alt="laptop"
                            />
                            <div className="famous-content position-absolute">
                                <h5>Big Screen</h5>
                                <h6>600 Nits of brightness</h6>
                                <p>From $399 or $16.62/mo. for 24 mo. *</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/smartwatch-full.png"
                                className="img-fluid"
                                alt="laptop"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">Studio Display</h5>
                                <h6 className="text-dark">
                                    Smart Watch Series
                                </h6>
                                <p className="text-dark">
                                    From $399 or $16.62/mo. for 24 mo. *
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/mobile-full.png"
                                className="img-fluid"
                                alt="laptop"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">Smartphones</h5>
                                <h6 className="text-dark">
                                    Smartphone 13 Pro.
                                </h6>
                                <p className="text-dark">
                                    From $399 or $16.62/mo. for 24 mo. *
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="famous-card position-relative">
                            <img
                                src="images/alexa-full.png"
                                className="img-fluid"
                                alt="laptop"
                            />
                            <div className="famous-content position-absolute">
                                <h5 className="text-dark">home speakers</h5>
                                <h6 className="text-dark">
                                    Room-filling sound.
                                </h6>
                                <p className="text-dark">
                                    From $399 or $16.62/mo. for 24 mo. *
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="special-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Special Products</h3>
                    </div>
                </div>
                <div className="row ">
                    {productState &&
                        productState?.map((item, index) => {
                            if (item.tags === "featured") {
                                return (
                                    <SpecialProducts
                                        key={index}
                                        id={item?._id}
                                        brand={item?.brand}
                                        title={item?.title}
                                        totalrating={item?.totalrating.toString()}
                                        price={item?.price}
                                        sold={item?.sold}
                                        quantity={item?.quantity}
                                    />
                                );
                            }
                        })}
                </div>
            </Container>

            <Container class1="popular-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">
                            Our Popular Products
                        </h3>
                    </div>
                </div>
                <div className="row">
                    {productState &&
                        productState?.map((item, index) => {
                            if (item.tags === "popular") {
                                return (
                                    <div
                                        key={index}
                                        className="col-3"
                                    >
                                        <div
                                            // to="/product/:id"
                                            className="product-card position-relative"
                                        >
                                            <div className="wishlist-icon position-absolute">
                                                <button
                                                    className="border-0 bg-transparent"
                                                    onClick={(e) => {
                                                        addToWish(item?._id);
                                                    }}
                                                >
                                                    <img
                                                        src={wish}
                                                        alt="wishlist"
                                                    />
                                                </button>
                                            </div>
                                            <div className="product-image">
                                                {item?.images &&
                                                    item.images[0] && (
                                                        <img
                                                            src={
                                                                item.images[0]
                                                                    .url
                                                            }
                                                            className="img-fluid mx-auto"
                                                            alt="product image"
                                                            width={160}
                                                        />
                                                    )}
                                                <img
                                                    src={watch1}
                                                    className="img-fluid mx-auto"
                                                    alt="product image"
                                                    width={160}
                                                />
                                            </div>
                                            <div className="product-details">
                                                <h6 className="brand">
                                                    {item?.brand}
                                                </h6>
                                                <h5 className="product-title">
                                                    {item?.title}
                                                </h5>
                                                <ReactStars
                                                    count={5}
                                                    /* onChange={ratingChanged} */ value={item?.totalrating.toString()}
                                                    edit={false}
                                                    size={20}
                                                    activeColor="#ffd700"
                                                />

                                                <p className="price">
                                                    ${item?.price}
                                                </p>
                                            </div>
                                            <div className="action-bar position-absolute">
                                                <div className="d-flex flex-column gap-15">
                                                   {/*  <button className="border-0 bg-transparent">
                                                        <img
                                                            src={prodcompare}
                                                            alt="compare"
                                                        />
                                                    </button> */}
                                                    <button className="border-0 bg-transparent">
                                                        <img
                                                            onClick={() =>
                                                                navigate(
                                                                    "/product/" +
                                                                        item?._id
                                                                )
                                                            }
                                                            src={view}
                                                            alt="compare"
                                                        />
                                                    </button>
                                                 {/*    <button className="border-0 bg-transparent">
                                                        <img
                                                            src={addcart}
                                                            alt="compare"
                                                        />
                                                    </button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                </div>
            </Container>

            <Container class1="marque-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="marque-inner-wrapper card-wrapper">
                            <Marquee className="d-flex">
                                <div className="mx-4 w-25 ">
                                    <img
                                        src="images/brand-01.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-02.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-03.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-04.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-05.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-06.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-07.png"
                                        alt="brand"
                                    />
                                </div>
                                <div className="mx-4 w-25">
                                    <img
                                        src="images/brand-08.png"
                                        alt="brand"
                                    />
                                </div>
                            </Marquee>
                        </div>
                    </div>
                </div>
            </Container>

            <Container class1="blog-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <h3 className="section-heading">Our Latest Blogs</h3>
                    </div>
                    <div className="row">
                        {blogState &&
                            blogState?.map((item, index) => {
                                if (index < 4) {
                                    return (
                                        <div
                                            className="col-3"
                                            key={index}
                                        >
                                            <BlogCard
                                                id={item?._id}
                                                title={item?.title}
                                                description={item?.description}
                                                image={item?.images[0]?.url}
                                                date={moment(
                                                    item?.createdAt
                                                ).format(
                                                    "MMMM Do YYYY, h:mm a"
                                                )}
                                            />
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Home;
