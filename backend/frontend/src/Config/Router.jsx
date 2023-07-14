import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Hero } from "../Components/Hero";
import { Login, Signup, Dashboard } from "../Pages";
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const Router = () => {
  return (
    <Routes>

        <Route path="/" element={
          <PublicRoute>
            <Hero/>
          </PublicRoute>
        }/>

        <Route path="/home" element={
          <PublicRoute>
            <Hero/>
          </PublicRoute>
        }/>

        <Route path="/login" element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }/>

        <Route path="/signup" element={
          <PublicRoute>
            <Signup/>
          </PublicRoute>
        }/>

        <Route path="/dashboard/*" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }/>
        <Route path="*" element={<h2 className='text-5xl font-bold h-[79vh] flex items-center justify-center'>Error 404: Page Not Found</h2>}/>

    </Routes>
  )
}
