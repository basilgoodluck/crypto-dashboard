import React from "react";
import { useAuth } from "../hooks/authProvider";
import defaultProfile from "../assets/default-profile.png";
import { IoSettingsSharp } from "react-icons/io5";

const ProtectedNavbar: React.FC = () => {
  const { username } = useAuth(); 


  return (
    <nav className="bg-background-dark  shadow-xl shadow-gray-300 fixed w-full z-20">
      <div className="w-11/12 md:w-4/5 mx-auto py-4">
        <div className=" flex justify-between items-center">
          <IoSettingsSharp />
          <div className="bg-white shadow-md shadow-gray-200 rounded-full w-6 h-6">
            <img
              src={defaultProfile} 
              alt={username || "User"}
              className="w-full rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ProtectedNavbar;
