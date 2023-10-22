import React, { useEffect } from "react";
import Meta from "./Meta";
import BreadCrumb from "./BreadCrumb";
import cross from "../images/cross.svg";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";

const Wishlist = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        getWishlistFromDb();
    }, []);

    const getWishlistFromDb = () => {
        dispatch(getUserProductWishlist());
    };

    const wishlistState = useSelector(
        (state) => state?.auth?.wishlist?.wishlist
    );

    const removeFromWishlist = (id) => {
        dispatch(addToWishlist(id));
        setTimeout(() => {
            dispatch(getUserProductWishlist());
        }, 300);
    };
    // console.log(wishlistState);
    return (
        <>
            <Meta title={"Wishlist"} />
            <BreadCrumb title={"Wishlist"} />
            <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                <div className="row">
                    {wishlistState && wishlistState?.length === 0 && (
                        <div className="text-center fs-4">No Data</div>
                    )}
                    {wishlistState && wishlistState?.map((item, index) => {
                        return (
                            <div
                                className="col-3"
                                key={index}
                            >
                                <div className="wishlist-card position-relative">
                                    <img
                                        onClick={() => {
                                            removeFromWishlist(item?._id);
                                        }}
                                        src={cross}
                                        className="position-absolute cross img-fluid"
                                        alt="cross"
                                    />
                                    <div className="wishlist-card-image bg-white">
                                        <img
                                            src={
                                                item.images &&
                                                item.images[0] &&
                                                item.images[0].url
                                                    ? item.images[0].url
                                                    : watch
                                            }
                                            className="img-fluid d-block mx-auto"
                                            alt="watch"
                                            width={160}
                                        />
                                    </div>
                                    <div className="py-3 px-3">
                                        <h5 className="title">{item?.title}</h5>
                                        <p className="price">$ {item?.price}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </>
    );
};

export default Wishlist;
