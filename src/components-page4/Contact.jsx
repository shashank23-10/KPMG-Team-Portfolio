import React from "react";
import "./Contact.css";

export default function Contact() {
    
return (
<div className="contact">
    {/* HERO SECTION */}
    <section className="hero-section">
    <div className="overlay" />
    <div className="hero-content">
        {/* Replace these with your own content or leave it empty 
            if you just want the background image. */}
        <h1>Team Collaboration</h1>
        <p>Innovate. Collaborate. Grow.</p>
    </div>
    </section>

    {/* FOOTER */}
    <footer className="footer">
    <div className="footer-top">
        <ul>
        <li><a href="#contact">Contact Us</a></li>
        <li><a href="#submit-rfp">Submit RFP</a></li>
        </ul>
        <ul>
        <li><a href="#media">Newsroom</a></li>
        <li><a href="#media">Press Releases</a></li>
        </ul>
        <ul>
        <li><a href="#company">Careers</a></li>
        <li><a href="#company">About Us</a></li>
        </ul>
        <ul>
        <li><a href="#legal">Legal</a></li>
        <li><a href="#legal">Privacy</a></li>
        </ul>
    </div>
    <div className="footer-bottom">
        <a
        href="https://www.linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        >
        <img 
            src="https://cdn-icons-png.flaticon.com/512/145/145807.png" 
            alt="LinkedIn" 
            className="linkedin-icon" 
        />
        </a>
    </div>
    </footer>
</div>
);
}
