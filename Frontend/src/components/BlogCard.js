import React from "react";
import { Link } from "react-router-dom";
import blog1 from "../images/blog-1.jpg";

const BlogCard = (props) => {
    const { id, title, description, date, image } = props;

    return (
        <div className="blog-card">
            <div className="card-image">
                <img
                    src={image ? image : "images/blog-1.jpg"}
                    className="img-fluid w-100"
                    alt="blog"
                />
            </div>
            <div className="blog-content">
                <p className="date">{date}</p>
                <h5 className="title">{title}</h5>
                <p
                    className="desc"
                    dangerouslySetInnerHTML={{
                        __html: description?.substr(0, 65) + "...",
                    }}
                ></p>
                <Link
                    className="button"
                    // to="/blog/:id"
                    to={"/blog/" + id}
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
