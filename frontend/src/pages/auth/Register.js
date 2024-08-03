// @ts-nocheck
import React,{useState} from "react";
import styles from "./auth.module.scss";
import { TiUserAddOutline } from "react-icons/ti";
import Card from "../../components/card/Card";
import {Link, useNavigate} from 'react-router-dom'
import {SET_LOGIN, SET_NAME} from '../../redux/features/auth/authSlice'
import {toast} from 'react-toastify';
import { registerUser } from "../../services/authService";
import { useDispatch } from 'react-redux';
import Loader from "../../components/loader/Loader";
const initialState={
  name:"",
  email:"",
  password:"",
  confirm_password:"",

}

const Register = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const [isLoading, setIsLoading]=useState(false);
  const [formData, setformData]=useState(initialState);
  const {name,email,password,confirm_password}=formData;
  const handleInputChange=(e)=>{
 const {name,value}=e.target;
 setformData({...formData, [name]:value});
}
const register=async(e)=>{
   e.preventDefault();
   if(!name || !email || !password || !confirm_password)
     toast.error("All field are Required");
     if(password!==confirm_password)
     {
      toast.error("Passwords Do not match");
     }
     const userData={name, email, password}
     setIsLoading(true)
     try{
           const data= await registerUser(userData)
            await dispatch(SET_LOGIN(true));
          await dispatch(SET_NAME(data.name));
           navigate("/dashboard");
           setIsLoading(false);
     }
     catch(error)
     {
               setIsLoading(false);
                 const message =
      (error.response && error.response.data && error.response.data.message) || error.message ||  error.toString();
         toast.error(message);
     }
}
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirm_password"
              value={confirm_password}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Already an Account ? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default Register

