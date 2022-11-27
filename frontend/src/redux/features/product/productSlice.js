import React from "react";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
import productService from "./productService";
const initialState ={
    product:null,
    products:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
    totalStoreValue:0,
    outOfStock:0,
    category:[],
}
//Create New Product
export const createProduct = createAsyncThunk("products/create",
async(formData, thunkAPI)=>{
    try{
        return await productService.createProduct(formData)
    }catch(error)
    {
      const message=(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message)
    }
})
const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{
        CALC_STORE_VALUE(state,action)
        {
            console.log("Store Value")
        }
    },
    extraReducers:(builder)=>{
          builder.addCase(createProduct.pending,(state)=>{
            state.isLoading=true
          })
          .addCase(createProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            console.log(action.payload);
            state.products.push(action.payload);
            toast.success("Product Added Successfully")
          })
           .addCase(createProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
            toast.error(action.payload)
          })
    }
})

export const {CALC_STORE_VALUE, }=productSlice.actions;
export const selectIsLoading=(state) => state.auth.user;
export const selectIsLoggedIn=(state) => state.auth.user;
export default productSlice.reducer;