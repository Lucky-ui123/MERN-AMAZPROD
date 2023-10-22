import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch1 from "../images/watch-1.png";
import prodcompare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addcart from "../images/add-cart.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

const ProductCard = (props) => {
    const { grid, data } = props; // for using props we can get the data ""
    const dispatch = useDispatch();
    const location = useLocation();

    const addToWish = (id) => {
        // alert(id)
        dispatch(addToWishlist(id));
    };

    /*     Handle the case where data is not an array
     **** if data.map is not a fun, then show this code ,,,*/
    if (!Array.isArray(data)) {
        return <p>Error: Data is not an array</p>;
    }
    // console.log(data);
    return (
        <>
            {data?.map((item, index) => {
                return (
                    <div
                        key={index}
                        className={`${
                            location.pathname == "/product"
                                ? `gr-${grid}`
                                : "col-3"
                        }`}
                    >
                        {/* <Link to="/product" className="product-card position-relative" > */}
                        {/* <Link className="product-card position-relative"
                    to={`${
                        location.pathname == "/"
                        ? "/product/:id"
                        : location.pathname == "/product/:id"
                        ? "/product/:id"
                        : ":id"
                    }`}
                   > */}
                        <div
                            // to="/product/:id"
                            className="product-card position-relative"
                        >
                            <div className="wishlist-icon position-absolute">
                                <button className="border-0 bg-transparent">
                                    <img
                                        onClick={(e) => {
                                            addToWish(item?._id);
                                        }}
                                        src={wish}
                                        alt="wishlist"
                                    />
                                </button>
                            </div>
                            <div className="product-image">
                                {/*   <img
                                    src={item?.images[0].url}
                                    className="img-fluid mx-auto"
                                    alt="product image"
                                    width={160}
                                /> */}
                                {/* 
                                    so for above code this error:  Cannot read properties of undefined (reading 'url')
                                    use below conditional check it'll work
                                */}
                                {item?.images && item.images[0] && (
                                    <img
                                        src={item.images[0].url}
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
                                <h6 className="brand">{item?.brand}</h6>
                                <h5 className="product-title">{item?.title}</h5>
                                <ReactStars
                                    count={5}
                                    /* onChange={ratingChanged} */ value={item?.totalrating.toString()}
                                    edit={false}
                                    size={20}
                                    activeColor="#ffd700"
                                />
                                <p
                                    className={`description ${
                                        grid === 12 ? "d-block" : "d-none"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: item?.description,
                                    }}
                                ></p>
                                <p className="price">${item?.price}</p>
                            </div>
                            <div className="action-bar position-absolute">
                                <div className="d-flex flex-column gap-15">
                                    {/* <button className="border-0 bg-transparent">
                                        <img
                                            src={prodcompare}
                                            alt="compare"
                                        />
                                    </button> */}
                                    <Link
                                        to={"/product/" + item?._id}
                                        className="border-0 bg-transparent"
                                    >
                                        <img
                                            src={view}
                                            alt="compare"
                                        />
                                    </Link>
                                    <button className="border-0 bg-transparent">
                                        <img
                                            src={addcart}
                                            alt="compare"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductCard;
