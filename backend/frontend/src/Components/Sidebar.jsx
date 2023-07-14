import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar = () => {

    const location = useLocation()

    const Links = [
        {
            name: "Profile",
            path: "profile",
            icon: "fa-person"
        },
        {
            name: "Add Job",
            path: "addJob",
            icon: "fa-plus"
        },
        {
            name: "View Jobs",
            path: "viewJobs",
            icon: "fa-eye"
        },
    ]

  return (
    <>
    <div className='bg-purple-600 w-[300px] max-w-[300px] h-[100vh] text-white py-5 pt-10'>

        <div className='flex flex-col justify-center gap-3'>
        {
            Links.map((link, index) => {
                const isActive = (location.pathname) === "/dashboard/" + link.path
                console.log(location.pathname)
                return (
                <>
                <Link to={link.path} className={`link-border ${isActive ? "active" : ""} flex items-center gap-2`}>
                    <i className={`fas ${link.icon} text-xl`}></i>
                    <span>{link.name}</span>
                    {/* <Link to={link.path} className='text-xl font-semibold'>{link.name}</Link> */}
                </Link>    
                </>
                )
            })
        }
        </div>
    </div>
    </>
  )
}
