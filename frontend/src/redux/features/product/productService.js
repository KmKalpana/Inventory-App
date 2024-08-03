import axios from 'axios';

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/products/`;

// Create New Product 
export const createProduct = async (formData) => {
   try {
      const response = await axios.post(API_URL, formData);
      return response.data;
   } catch (error) {
      console.error("Error creating product:", error);
      throw error;
   }
};

// Get Products 
export const getProducts = async () => {
   try {
      const response = await axios.get(API_URL);
      return response.data;
   } catch (error) {
      console.error("Error getting products:", error);
      throw error;
   }
};

// Delete Product
export const deleteProduct = async (id) => {
   try {
      const response = await axios.delete(`${API_URL}${id}`);
      return response.data;
   } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
   }
};

// Get a Product
export const getProduct = async (id) => {
   try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
   } catch (error) {
      console.error("Error getting product:", error);
      throw error;
   }
};

// Update a Product
export const updateProduct = async (id, formData) => {
   try {
      const response = await axios.patch(`${API_URL}${id}`, formData);
      return response.data;
   } catch (error) {
      console.error("Error updating product:", error);
      throw error;
   }
};

const productService = {
    createProduct,
    getProducts,
    deleteProduct,
    getProduct,
    updateProduct
};

export default productService;
