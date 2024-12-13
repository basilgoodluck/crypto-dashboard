import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAuth } from '../hooks/authProvider';
import useMediaQuery from '../hooks/useMediaQuery';
import { RiMenu4Fill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [navModal, setNavModal] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  const userId = useAuth()
  const handleClick = () => {
    setNavModal(prev => !prev)
  }
  useEffect(() => {
    if(headerRef.current){
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  })
  const aboveMedia = useMediaQuery("(min-width: 1060px)")
  return (
    <header ref={headerRef} className=' bg-background-dark  shadow-xl shadow-gray-300 fixed w-full z-20'>
      <div className='flex w-11/12 md:w-4/5 justify-between items-center mx-auto py-4'>
        <h1  className='font-black text-accent-dark text-2xl'>ETH.DB</h1>
        {
          aboveMedia ? (
            <nav className='flex items-center gap-4'>
              <Link to="/">Home</Link>
              <Link to={`/users/${userId}/dashboard`}>Dashboard</Link>
              <Link to="/sign-up">Get a free account</Link>
              <Link to="/sign-in">Login</Link>
            </nav>
          ) : (
            <button onClick={handleClick} className='font-black text-accent-dark text-2xl'>
              {!navModal ? <RiMenu4Fill className='text-4xl font-black' /> : <FaTimes className='text-2xl' />}
            </button>
          )
        }
      </div>
      {
        navModal && (
          <div className={`${navModal ? "slide-left" : "slide-right text-text"} fixed top-[${headerHeight}] bg-white/80 shadow-md shadow-gray-200 w-full h-[40vh]`}>
            <ul className='flex flex-col justify-center items-center h-full gap-4 text-2xl'>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={`/users/${userId}/dashboard`}>Dashboard</Link></li>
              <li><Link to={"/sign-up"}>Get a free account</Link></li>
              <li><Link to={"/sign-in"}>Sign in</Link></li>
            </ul>
          </div>
        )
      }
    </header>
  )
}

export default Navbar