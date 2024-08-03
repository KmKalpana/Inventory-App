// @ts-nocheck
import React, {useEffect} from 'react';
import UseRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import ProductList from '../../components/Product/ProductList'
import ProductSummary from '../../components/Product/ProductSummary'

import { getProducts } from '../../redux/features/product/productSlice';
const Dashboard = () => {
    UseRedirectLoggedOutUser("/login")
    const dispatch=useDispatch()
    const isLoggedIn=useSelector(selectIsLoggedIn)
     const { products, isLoading, isError, message } = useSelector(
       (state) => state.product
     );
      useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      
    }
  }, [isLoggedIn, isError, message, dispatch]);
   return (
     <div>
       <ProductSummary products={products} />
       <ProductList products={products} isLoading={isLoading}  />
     </div>
   );

}

export default Dashboard;
