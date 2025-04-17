import React from "react";
import "./Navbar.css";
import Logo from "../assets/KPMG Logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={Logo} alt="KPMG Logo" className="nav-logo-img" />
        <h1 className="nav-title">Intelligent Solutions - Infinite Possibilities</h1>
      </div>
    </nav>
  );
};

export default Navbar;
