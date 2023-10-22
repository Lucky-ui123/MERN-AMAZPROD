import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumb from "./BreadCrumb";
import Meta from "./Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "./Color";
import watch from "../images/watch.jpg";
import gr from "../images/gr.svg";
import gr2 from "../images/gr2.svg";
import gr3 from "../images/gr3.svg";
import gr4 from "../images/gr4.svg";
import Container from "../components/Container";
import { getAllProducts } from "../features/products/productSlice";

const OurStore = () => {
    const dispatch = useDispatch();
    const [grid, setGrid] = useState();
    // alert(grid);
    const productState = useSelector((state) => state.product.products);
    // const [popularProduct, setPopularProduct] = useState([])
 
 const [brands, setBrands] = useState([])
 const [categories, setCategories] = useState([])
 const [tags, setTags] = useState([])
//  const [colors, setColors] = useState([])

// FILTER STATES
const [brand, setBrand] = useState(null)
 const [category, setCategory] = useState(null)
 const [tag, setTag] = useState(null)
 const [minPrice, setMinPrice] = useState(null)
 const [maxPrice, setMaxPrice] = useState(null)
 const [sort, setSort] = useState(null)

 console.log(sort);
 // FILTERING
    useEffect(()=>{
        let newBrands = []
        let category = []
        let newtags=[]
        let newColors = []

        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            newBrands.push(element.brand)
            category.push(element.category)
            newtags.push(element.tags)
            newColors.push(element.color)
        }
        setBrands(newBrands)
        setCategories(category)
        setTags(newtags)
        // setColors(newColors)
    },[productState])
    // console.log([...new Set(brands)], [...new Set(categories)], [...new Set(tags)]); // removing duplicate BRANDS

    useEffect(() => {
        getProducts();
    }, [sort,brand,tag,minPrice,maxPrice,category]);

    const getProducts = () => {
        dispatch(getAllProducts({sort, tag, brand, category, minPrice, maxPrice}));
    };

    return (
        <>
            <Meta charSet={"Our Store"} />
            <BreadCrumb title="Our Store" />
            <Container class1="stoer-wrapper home-wrapper-2 py-5">
                <div className="d-flex gap-15">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Shop By Categories</h3>
                            <div>
                                <ul className="ps-0">
                                   {
                                    categories && [...new Set(categories)].map((item, index)=>{
                                        return (
                                            <li key={index} onClick={()=>setCategory(item)}>{item}</li>
                                        )
                                    })
                                   }
                                </ul>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Filter By</h3>
                            <div>
                                {/* <h5 className="sub-title">Availability</h5> */}
                        {/*   <div>
                                   <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="form-check-input"
                                            id=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="form-check-label"
                                        >
                                            In Stock(1)
                                        </label>
                                    </div> 
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="form-check-input"
                                            id=""
                                        />
                                        <label
                                            htmlFor=""
                                            className="form-check-label"
                                        >
                                            Out of Stock(0)
                                        </label>
                                    </div> 
                                </div>*/}
                                <h5 className="sub-title">Price</h5>
                                <div className="d-flex align-items-center gap-10">
                                    <div className="form-floating ">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Enter amount"
                                            onChange={(e)=>setMinPrice(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput">
                                            From
                                        </label>
                                    </div>
                                    <div className="form-floating ">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="floatingInput1"
                                            placeholder="Enter amout"
                                            onChange={(e)=>setMaxPrice(e.target.value)}
                                        />
                                        <label htmlFor="floatingInput1">
                                            To
                                        </label>
                                    </div>

                                </div>
                               {/*  <h5 className="sub-title">Colors</h5>
                                <div>
                                    <Color />
                                </div> */}
                                {/* <h5 className="sub-title">Size</h5>
                                <div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="form-check-input"
                                            id="color-1"
                                        />
                                        <label
                                            htmlFor="color-1"
                                            className="form-check-label"
                                        >
                                            S (2)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="form-check-input"
                                            id="color-2"
                                        />
                                        <label
                                            htmlFor="color-2"
                                            className="form-check-label"
                                        >
                                            M (5)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="form-check-input"
                                            id="color-3"
                                        />
                                        <label
                                            htmlFor="color-3"
                                            className="form-check-label"
                                        >
                                            L (3)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="form-check-input"
                                            id="color-4"
                                        />
                                        <label
                                            htmlFor="color-4"
                                            className="form-check-label"
                                        >
                                            XL (10)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            name=""
                                            className="form-check-input"
                                            id="color-5"
                                        />
                                        <label
                                            htmlFor="color-5"
                                            className="form-check-label"
                                        >
                                            XXL (22)
                                        </label>
                                    </div>
                                </div> */}
                            </div>
                             <div className="mt-3 mb-3">
                            <h3 className="sub-title mb-2">Product Tags</h3>
                            <div>
                                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                {
                                    tags && [...new Set(tags)].map((item, index)=>{
                                        return (
                                            <span key={index} onClick={()=>setTag(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                {item}
                                            </span>
                                        )
                                    })
                                   }
                                   </div>
                            </div>
                        </div>
                        <div className="">
                            <h3 className="sub-title mb-2">Product Brands</h3>
                            <div>
                                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                {
                                    brands && [...new Set(brands)].map((item, index)=>{
                                        return (
                                            <span key={index} onClick={()=>setBrand(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">
                                                {item}
                                            </span>
                                        )
                                    })
                                   }
                                   </div>
                            </div>
                        </div>
                        </div>
                       
                        {/* <div className="filter-card mb-3">
                            <h3 className="filter-title">Random Product</h3>
                            <div>
                                <div className="random-products mb-3 d-flex">
                                    <div className="w-50">
                                        <img
                                            src={watch}
                                            alt="img-fluid"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="w-50">
                                        <h5>
                                            Kids headphones bulk 10 pack multi
                                            colored for students
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            value={3}
                                            edit={false}
                                            size={20}
                                            activeColor="#ffd700"
                                        />
                                        <b>$30</b>
                                    </div>
                                </div>
                                <div className="random-products d-flex">
                                    <div className="w-50">
                                        <img
                                            src={watch}
                                            alt="img-fluid"
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="w-50">
                                        <h5>
                                            Kids headphones bulk 10 pack multi
                                            colored for students
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            value={3}
                                            edit={false}
                                            size={20}
                                            activeColor="#ffd700"
                                        />
                                        <b>$30</b>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-3">
                            <div className="d-flex justify-content-between align-items-center ">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0 d-block" style={{ width: "100px" }} >Sort By:</p>
                                    <select name="" id="" onChange={(e)=>setSort(e.target.value)} className="form-control form-select" >
                                        <option value="title"> Alphabetically, A-Z </option>
                                        <option value="-title"> Alphabetically, Z-A </option>
                                        <option value="price"> Price low to high </option>
                                        <option value="-price"> Price high to low </option>
                                        <option value="createdAt"> Date, old to new </option>
                                        <option value="-createdAt"> Date, new to old </option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center gap-10">
                                    <p className="totalproducts mb-0">21 Products</p>
                                    <div className="d-flex gap-10 align-items-center grid">
                                        <img src={gr4} alt="grid" onClick={() => { setGrid(3); }}
                                            className="d-block img-fluid"
                                        />
                                        <img src={gr3} alt="grid" onClick={() => { setGrid(4); }}
                                            className="d-block img-fluid"
                                        />
                                        <img src={gr2} alt="grid" onClick={() => { setGrid(6); }}
                                            className="d-block img-fluid"
                                        />
                                        <img src={gr} alt="grid" onClick={() => { setGrid(12); }}
                                            className="d-block img-fluid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex gap-15 flex-wrap">
                               {/*  {Array.isArray(productState) ? (
                                    <ProductCard
                                        data={productState}
                                        grid={grid}
                                    />
                                ) : (
                                    <p>Error: Data is not an array</p>
                                )} */}
                                <ProductCard
                                    /*  data={productState} 
                                            Handle the case where data is not an array
                                    **** if data.map is not a fun, then show this code */
                                    data={productState ? productState : []}
                                    grid={grid}
                                />
                                {/* so using 'data' we are getting the data from
                                database and use this 'data ' as props in this
                                "productState in ProductCard file" */}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default OurStore;
