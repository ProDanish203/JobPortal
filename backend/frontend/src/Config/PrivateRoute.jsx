import React, { useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../Store/Reducers/AuthReducer";
import axios from "axios";

export const PrivateRoute = ({children}) => {
    
    const { user }  = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const getUser = async () => {
        try{
            const {data} = await axios.post("/api/v1/user/getUser", {
                token: localStorage.getItem('Token')
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('Token')}`
                }
            }
            )
            // console.log(data);

            if(data.success){
                dispatch(setUser(data.data))
            }
            else{
                localStorage.clear();
                <Navigate to="/login"/>
            }
        }
        catch(error){
            localStorage.clear();
            console.log(error)
        }
    }

    useEffect(() => {
        if(!user){
            getUser();
        }
    }, [])

  if(localStorage.getItem('Token')){
    return children;
  }
  else{
    return <Navigate to="/login"/>
  }
}
