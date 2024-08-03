// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/Product/ProductForm';
import {
  getProduct,
  getProducts,
  selectProduct,
  updateProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import Loader from "../../components/loader/Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(selectIsLoading);
    const productEdit = useSelector(selectProduct);
    const [product, setProduct] = useState(productEdit);
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        // @ts-ignore
        dispatch(getProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        setProduct(productEdit);

        setImagePreview(
            // @ts-ignore
            productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
        );

        setDescription(
            productEdit && productEdit.description ? productEdit.description : ""
        );
    }, [productEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validFormats = ['image/jpeg', 'image/png', 'image/jpg'];
            if (validFormats.includes(file.type)) {
                setProductImage(file);
                setImagePreview(URL.createObjectURL(file));
            } else {
                toast.error('Invalid file type. Please select a jpg, jpeg, or png image.');
                e.target.value = ''; // Clear the file input
            }
        }
    };

    const validateForm = () => {
        if (!product.name || !product.category || !product.price || !product.quantity) {
            toast.error('All fields are required');
            return false;
        }
        if (!/^\d*\.?\d+$/.test(product.price)) {
            toast.error('Product price should be a valid number');
            return false;
        }
        if (isNaN(product.quantity) || Number(product.quantity) <= 0) {
            toast.error('Product quantity should be a valid number greater than zero');
            return false;
        }
        return true;
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("name", product?.name);
        formData.append("category", product?.category);
        formData.append("quantity", product?.quantity);
        formData.append("price", product?.price);
        formData.append("description", description);
        if (productImage) {
            formData.append("image", productImage);
        }

        try {
            await dispatch(updateProduct({ id, formData }));
            await dispatch(getProducts());
            navigate("/dashboard");
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    return (
        <div>
            {isLoading && <Loader />}
            <h3 className="--mt">Edit Product</h3>
            <ProductForm
                product={product}
                productImage={productImage}
                imagePreview={imagePreview}
                description={description}
                setDescription={setDescription}
                handleInputChange={handleInputChange}
                handleImageChange={handleImageChange}
                saveProduct={saveProduct}
            />
        </div>
    );
};

export default EditProduct;
