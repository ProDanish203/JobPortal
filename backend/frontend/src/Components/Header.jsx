import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from '../Store/Reducers/AuthReducer';

export const Header = () => {

  const [menuIsOpen, setmenuIsOpen] = useState(false)
  const { user }  = useSelector(state => state.auth)

  const dispatch = useDispatch();



  // console.log(user);

  const navigate = useNavigate()
  const logout = () => {
    dispatch(setUser(null))
    localStorage.clear();
    navigate("/login");
  } 


  return (
    <header className='relative shadow-lg flex items-center z-50 justify-between w-full py-4 px-5'>

      <div className='text-2xl font-extrabold cursor-pointer'>
        <Link to="/">Linkera</Link>
      </div>

      {!menuIsOpen ? (
      <nav className='items-center justify-between gap-4 md:flex hidden'>
        {/* {navLinks.map((link, index) => (
          <Link 
          to={link.path} 
          key={index}
          className='cursor-pointer hover:text-red-400 font-semibold '
          onClick={() => setmenuIsOpen(false)}
          >{link.name}</Link>
        ))} */}

        {user ? (
          <>
          <button
          onClick={logout}
          className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Logout</button>
          </>
        ) : (
          <>
        <Link to="/login"
        onClick={() => setmenuIsOpen(false)}
        >
          <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Login</button>
        </Link>
        <Link to="/signup"
        onClick={() => setmenuIsOpen(false)}
        >
          <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Signup</button>
        </Link>

          </>
          )}
      </nav>
      )
      : (
        <nav className='flex justify-center absolute top-[100%] left-0 px-4 py-5 bg-white shadow-2xl w-full flex-col items-start gap-4'>
          {/* {navLinks.map((link, index) => (
          <Link 
          to={link.path} 
          key={index}
          className='cursor-pointer text-xl font-semibold md:hidden flex'
          onClick={() => setmenuIsOpen(false)}
          >{link.name}</Link>
        ))} */}

        {user ? (
          <button 
          onClick={logout}
          className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'
          >Logout</button>
        ): (
          <>
        <div className='flex items-center gap-4'>
          <Link to="/login"
          onClick={() => setmenuIsOpen(false)}
          >
            <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Login</button>
          </Link>
          <Link to="/signup"
          onClick={() => setmenuIsOpen(false)}
          >
            <button className='px-5 py-2 text-white bg-purple-700 rounded-md cursor-pointer font-bold text-md'>Signup</button>
          </Link>
        </div>

        </>)}
        </nav>
      )
    }
    <div className='md:hidden'>
      <i className={`fas fa-${menuIsOpen ? 'times' : 'bars'} cursor-pointer text-2xl font-extrabold`}
      onClick={() => setmenuIsOpen(prev => !prev)}
      ></i>
    </div>

      

    </header>
  )
}
