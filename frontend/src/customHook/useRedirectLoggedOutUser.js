import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SET_LOGIN } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authService';
const UseRedirectLoggedOutUser = (path) => {
       const dispatch=useDispatch()
        const navigate=useNavigate()
    useEffect(() => {
        
        const redirect = async()=>{
            const isLoggedIn = await getLoginStatus()
             dispatch(SET_LOGIN)
             if(!isLoggedIn)
             {
                toast.info("Session Expired, Please Login To Contiue.")
                navigate(path)
                return
             }
        }
        redirect()
    }, [navigate, path, dispatch]);
  
}

export default UseRedirectLoggedOutUser;
