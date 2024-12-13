import React from "react";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import ProtectedNavbar from "./protectedNavbar";

const ProtectedLayout: React.FC = () => {
    return (
        <div className="relative min-h-screen flex flex-col">
            <ProtectedNavbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default ProtectedLayout;
