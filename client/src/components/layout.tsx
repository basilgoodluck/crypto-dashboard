import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Layout;
