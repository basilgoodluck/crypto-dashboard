import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (<>
        <Navbar />
        <main><Outlet /></main>
        <Footer />
  </>)
}

export default Layout