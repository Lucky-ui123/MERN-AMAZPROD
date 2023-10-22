import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

// user details
const getBlogCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory/`);
    return response.data;
};

//
const createBlogCategory = async (blogCategory) => {
    const response = await axios.post(
        `${base_url}blogcategory/`,
        blogCategory,
        config
    );
    return response.data;
};

//
const getBlogCategory = async (id) => {
    const response = await axios.get(
        `${base_url}blogcategory/${id}`,
        config
    );
    return response.data;
};

//
const updateBlogCategory = async (blogCat) => {
    const response = await axios.put(
        `${base_url}blogcategory/${blogCat.id}`,
        { title: blogCat.blogCatData.title },
        config
    );
    return response.data;
};

//
const deleteBlogCategory = async (id) => {
    const response = await axios.delete(
        `${base_url}blogcategory/${id}`,
        config
    );
    return response.data;
};

const blogCategoryService = {
    getBlogCategories,
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};

export default blogCategoryService;
