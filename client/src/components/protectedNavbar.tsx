import React from "react";
import defaultProfile from "../assets/default-profile.png";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const ProtectedNavbar: React.FC = () => {


  return (
    <nav className="bg-accent-dark  shadow-sm shadow-black fixed w-full z-20">
      <div className="w-11/12 md:w-4/5 mx-auto py-4">
        <div className=" flex justify-between items-center">
          <Link to={"/account/settings"}><IoSettingsSharp className="text-white text-2xl" /></Link>
          <Link to={"/dashboard"} className="bg-white shadow-md shadow-black rounded-full w-6 h-6">
            <img
              src={defaultProfile} 
              alt={"User"}
              className="w-full rounded-full"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default ProtectedNavbar;