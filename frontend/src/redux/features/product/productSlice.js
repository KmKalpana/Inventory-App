import React from "react";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {toast} from 'react-toastify'
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

    }
})
export const {CALC_STORE_VALUE, }=productSlice.actions;
export default productSlice.reducer;