import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({children}) => {
    if(localStorage.getItem('Token')){
        return <Navigate to="/dashboard"/>
    }
    else{
        return children;
    }
}
