import React from 'react';
import {RiProductHuntLine} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import './Home.scss'
const Home = () => {
    return (
        <div className='Home'>
          <nav className='container --flex-between'>
          <div className='logo'>
             <RiProductHuntLine size={35}/>
          </div>
          <ul className='home-links'>
            <li>
            <Link to="/register">
              Register
            </Link>
         </li>
           <li>
           <button className='--btn --btn-primary'>
            <Link to="/login">
              Login
            </Link>
            </button>
         </li>
         <li>
           <button className='--btn --btn-primary'>
            <Link to="/dashboard">
              dashboard
            </Link>
            </button>
         </li>
          </ul>
          </nav>  
        </div>
    );
}

export default Home;
