import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { RiMenu4Fill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [navModal, setNavModal] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

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
    <header ref={headerRef} className='bg-background-dark  shadow-xl shadow-gray-300 relative z-20'>
      <div className='flex w-11/12 md:w-4/5 justify-between items-center mx-auto py-4'>
        <h1  className='font-black text-accent-dark text-2xl'>ETH.DB</h1>
        {
          aboveMedia ? (
            <nav>
            <Link to="/">Home</Link>
            <Link to="/users/:userId/dashboard">Admin</Link>
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
          <div className={`${navModal ? "slide-left" : "slide-right"} fixed top-[${headerHeight}] bg-accent-dark w-full h-[40vh]`}>
            <ul className='text-white flex flex-col justify-center items-center h-full gap-4 text-2xl'>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/users/:userId/dashboard"}>Admin</Link></li>
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