import React from 'react'
import {useSelector}  from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
export const ShowOnLogin = ({children}) =>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(isLoggedIn)
    {
          return <>{children} </>
    }
    else
    return null;
}
export const ShowOnLogOut = ({children}) =>{
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if(!isLoggedIn)
    {
           return <>{children}</>
    }
    else
    return null;
}