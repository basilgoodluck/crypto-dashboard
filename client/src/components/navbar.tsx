import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [navModal, setNavModal] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  const hadnleClick = () => {
    setNavModal(prev => !prev)
    console.log(headerRef.current)
  }
  useEffect(() => {
    if(headerRef.current){
      setHeaderHeight(headerRef.current.offsetHeight)
    }
  })
  const aboveMedia = useMediaQuery("(min-width: 1060px)")
  return (
    <header ref={headerRef} className='bg-background-dark border border-gray-300 relative'>
      <div className='flex w-11/12 md:w-4/5 justify-between items-center mx-auto py-4'>
        <h1><span className='font-black text-secondary-light text-2xl'>ETH</span><span className='text-md italic text-accent-dark '>.dashboard</span></h1>
        {
          aboveMedia ? (
            <nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Admin</Link>
            <Link to="/sign-in">Login</Link>
        </nav>
          ) : (
            <button onClick={hadnleClick}>
              {!navModal ? <FaBars className='text-2xl ' /> : <FaTimes className='text-2xl' />}
            </button>
          )
        }
      </div>
      {
        navModal && (
          <div className={`fixed top-[${headerHeight}] bg-accent-dark w-full h-[40vh]`}>
            <ul className='text-white flex flex-col justify-center items-center h-full gap-4 text-2xl'>
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/dashboard"}>Dashboard</Link></li>
              <li><Link to={"/sign-up"}>Sign up</Link></li>
              <li><Link to={"/sign-in"}>Sign in</Link></li>
            </ul>
          </div>
        )
      }
    </header>
  )
}

export default Navbar