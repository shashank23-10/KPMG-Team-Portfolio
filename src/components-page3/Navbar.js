import React from "react";
import "./Navbar.css";
import Logo from "../assets/KPMG Logo.png";
import DownArrow from "../assets/bottom-arrow-icon.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="/">
        <img src={Logo} alt="Logo" className="nav-logo-img" />
      </a>
      <div className="nav-right">
        {/* Text links */}
        <a href="#" className="link">Our Insights</a>
        <a href="/" className="link active">What We Do</a>
        {/* Button link: add the extra class "no-underline" */}
        <a href="/5" className="link no-underline">
          <button id="contact">Contact Us</button>
        </a>
        <div className="language-dropdown">
          <span className="language-code">En</span>
          <span className="dropdown-icon">
            <img src={DownArrow} alt="Dropdown Icon" />
          </span>
          <a href="#" className="link no-underline">
            <button id="country">IN</button>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
