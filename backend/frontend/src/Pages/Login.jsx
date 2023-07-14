import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from "../Components/Loader";
import { toast } from "react-toastify";
import axios from "axios";

export const Login = () => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const [loading, setLoading] = useState(false);

    const [showPass, setShowPass] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            const {data} = await axios.post("/api/v1/auth/login", {
                email,
                password: pass
            }) 

            setLoading(false);
            localStorage.setItem('Token', data.token)
            toast.success("Login Successfull")
            // console.log(data)
            navigate("/home");
        }  
        catch(err){
            // console.log("console from Catch block")
            // console.log(err)
            toast.error(err.response.data.message)
            setLoading(false)
        }

        // navigate("/home");
    }

  return (
    <>
    <div className="form-container flex flex-col gap-5 items-center justify-center mt-3 min-h-[80vh] h-full w-full">

    <form 
    onSubmit={handleLogin}
    className='px-3 py-4 bg-purple max-w-[350px] rounded-md bg-white w-full flex flex-col gap-3 items-center justify-center shadow-2xl '
    >
        <h2 className='font-bold text-3xl mb-3'>Login</h2>

        <div className='px-3 w-full'>
            <label htmlFor="email" className='text-md font-semibold'>Email Address:</label>
            <input 
            id='email'
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className='w-full px-4 py-2 border-2 border-[#999] focus:border-[#333] rounded-md outline-none mt-2'
            placeholder='Email Address'
            autoComplete='off'
            />
        </div>

        <div className='px-3 w-full'>
            <label htmlFor="password" className='text-md font-semibold'>Password:</label>

            <div className='px-4 py-2 flex items-center justify-center border-2 border-[#999] focus:border-[#333] rounded-md'>
            <input 
            id='password'
            type={`${showPass ? "text" : "password"}`} 
            required 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            className='w-full border-none outline-none'
            placeholder='Enter Password'
            autoComplete='off'
            />
            <i className={`fas fa-${showPass ? 'eye-slash' : 'eye'} cursor-pointer text-xl hover:text-purple-700`} 
            onClick={() => setShowPass(prev => !prev)}
            ></i>
            </div>
        </div>

        <div className='px-3 w-full mt-4'>
            <button className='w-full bg-purple-700 text-white text-xl py-2 rounded-md'>{loading ? <Loader dark={false}/> : "Login"}</button>
        </div>

        <p className='text-md self-start pl-3 mt-2'>Don't have an account? <Link to="/signup" className='text-purple-500 cursor-pointer'>Signup now</Link></p>

    </form>
    </div>
    </>
  )
}
