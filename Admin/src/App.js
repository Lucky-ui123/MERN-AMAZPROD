import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Forgotpassword from "./pages/Forgotpassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import AddBlogCat from "./pages/AddBlogCat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import Addcoupon from "./pages/Addcoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import { PrivateRoutes } from "./routing/privateRoutes";
import { OpenRoutes } from "./routing/openRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path='/reset-password' element={<Resetpassword />} />
          <Route path='/forgot-password' element={<Forgotpassword />} />
          <Route path='/admin' element={<PrivateRoutes><MainLayout /></PrivateRoutes>} >
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="enquiries/:id" element={<ViewEnq />} />
            <Route path="blog" element={<Addblog />} />
            <Route path="blog/:id" element={<Addblog />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="coupon" element={<Addcoupon />} />
            <Route path="coupon/:id" element={<Addcoupon />} />
            <Route path="coupon-list" element={<Couponlist />} />
            <Route path="blog-category" element={<AddBlogCat />} />
            <Route path="blog-category/:id" element={<AddBlogCat />} />
            <Route path="blog-category-list" element={<Blogcatlist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<ViewOrder />} />
            <Route path="customers" element={<Customers />} />
            <Route path="color" element={<Addcolor />} />
            <Route path="color/:id" element={<Addcolor />} />
            <Route path="color-list" element={<Colorlist />} />
            <Route path="category" element={<Addcat />} />
            <Route path="category/:id" element={<Addcat />} />
            <Route path="category-list" element={<Categorylist />} />
            <Route path="brand" element={<Addbrand />} />
            <Route path="brand/:id" element={<Addbrand />} />
            <Route path="brand-list" element={<Brandlist />} />
            <Route path="product" element={<Addproduct />} />
            <Route path="product-list" element={<Productlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
