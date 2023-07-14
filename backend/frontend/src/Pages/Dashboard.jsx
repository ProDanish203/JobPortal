import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Sidebar } from '../Components/Sidebar'
import { Profile } from './Profile'
import { AddJob } from "./AddJob";
import { ViewJobs } from "./ViewJobs";


export const Dashboard = () => {
  return (
    <div className='flex relative'>
    <Sidebar/>

    <Routes>
      <Route path="/" element={<Profile/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/addJob" element={<AddJob/>}/>
      <Route path="/viewJobs" element={<ViewJobs/>}/>
    </Routes>

    </div>
  )
}
