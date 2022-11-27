import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import ProductForm from '../../components/ProductForm/ProductForm'
import { createProduct } from '../../redux/features/product/productService'
import {useNavigate} from 'react-router-dom'
const initialState = {
  name: '',
  category: '',
  quantity: '',
  price: '',
}
const AddProduct = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
  const [product, setProduct] = useState(initialState)
  const [productImage, setProductImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState('')
  const { name, category, quantity, price } = product
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  };
const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    // @ts-ignore
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  const generateSKU=(cargegory)=>{
             const letter=category.slice(0,3).toUpperCase()
           const number=Date.now()
           return letter+"-"+number
  };
  const saveProduct=async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    FormData.append("name",name)
    FormData.append("SKU",generateSKU(category))
    formData.append("Category",category)
    formData.append("Quantity",quantity)
    formData.append("Price",price)
    formData.append("description",description)
    formData.append("image",productImage)
    console.log(...formData);
    // await dispatch(createProduct(formData))
    // navigate("/dashboard")
  }
  return (
    <div>
      <h3 className="--mt">Add New Product</h3>
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
  )
}

export default AddProduct
