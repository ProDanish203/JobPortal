import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "../Components/Input";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Loader } from '../Components/Loader';
import { toast } from "react-toastify";

export const Signup = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        location: "",
        pass: "",
        cpass: "",
    }) 

    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({...user, [name]: value})
    }


    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSignup = async (e) => {
        e.preventDefault();

        if(user.pass.length < 6){
            toast.error("Password should be greater than 6 characters")
            return;
        }
        else if(user.pass !== user.cpass){
            toast.error("Passwords do not match")
            return;
        }

        try{
            setLoading(true);
            const { data } = await axios.post("/api/v1/auth/register", {
                name: user.name,
                email: user.email,
                password: user.pass,
                location: user.location
            })

            setLoading(false);
            // console.log(data)
            toast.success("Account Registered")
            navigate("/login")
        }
        catch(err){
            // console.log("Console From Catch Block")
            // console.log(err)
            toast.error(err.response.data.message)
            setLoading(false);
        }
    
    }

  return (
    <>
    <div className="form-container flex flex-col gap-5 items-center mt-3 justify-center min-h-[80vh] h-full w-full">
    
    <form 
    onSubmit={handleSignup}
    className='px-3 py-4 bg-purple max-w-[350px] rounded-md bg-white w-full flex flex-col gap-3 items-center justify-center shadow-2xl '
    >
        <h2 className='font-bold text-3xl mb-3'>Signup</h2>

        <Input id="name" label="Name" type="text" name="name" value={user.name} handleChange={handleChange} placeholder="Enter Name"/>
        <Input id="email" label="Email Address" type="email" name="email" value={user.email} handleChange={handleChange} placeholder="Email Address"/>
        <Input id="location" label="Country" type="text" name="location" value={user.location} handleChange={handleChange} placeholder="Country"/>

        <div className='px-3 w-full'>
            <label htmlFor="password" className='text-md font-semibold'>Password:</label>

            <div className='px-4 py-2 flex items-center justify-center border-2 border-[#999] focus:border-[#333] rounded-md'>
                <input 
                id='password'
                type={`${showPass ? "text" : "password"}`} 
                required 
                name='pass'
                value={user.pass} 
                onChange={handleChange} 
                className='w-full border-none outline-none'
                placeholder='Enter Password'
                autoComplete='off'
                />
                <i className={`fas fa-${showPass ? 'eye-slash' : 'eye'} cursor-pointer text-xl hover:text-purple-700`} 
                onClick={() => setShowPass(prev => !prev)}
                ></i>
            </div>
        </div>

        <div className='px-3 w-full'>
            <label htmlFor="cpass" className='text-md font-semibold'>Confirm Password:</label>
            <input 
            id='cpass'
            type={`${showPass ? "text" : "password"}`} 
            required 
            name='cpass'
            value={user.cpass} 
            onChange={handleChange} 
            className='w-full px-4 py-2 border-2 border-[#999] focus:border-[#333] rounded-md outline-none mt-2'
            placeholder='Re-enter Password'
            autoComplete='off'
            />
        </div>

        <div className='px-3 w-full mt-4'>
            <button className='w-full bg-purple-700 text-white text-xl py-2 rounded-md'>{loading ? <Loader dark={false}/> : "Signup"}</button>
        </div>

        <p className='text-md self-start pl-3 mt-2'>Already have an account? <Link to="/login" className='text-purple-500 cursor-pointer'>Login</Link></p>

    </form>
    </div>
    </>
  )
}
