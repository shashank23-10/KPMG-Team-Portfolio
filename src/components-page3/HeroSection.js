import React, { useState, useEffect } from "react";
import "./HeroSection.css";

const HeroSection = () => {
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
const handleScroll = () => {
    const threshold = 300; 
    const progress = Math.min(window.scrollY / threshold, 1);
    setScrollProgress(progress);
};

window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Converting styles with scroll:
// width: 70% to 100vw 
// height: 70vh to 100vh
// borderRadius: 20px to 0px
const containerWidth =
scrollProgress < 1 ? `${70 + 30 * scrollProgress}%` : "100vw";
const containerHeight = `${70 + 30 * scrollProgress}vh`;
const borderRadius =
scrollProgress < 1 ? `${20 - 20 * scrollProgress}px` : "0px";

const handleClick = () => {
    // Note from Shashank: Will have to change to the ID for below-video-section.
    const target = document.getElementById("new-section");
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
};

return (
<div className="hero-section-wrapper">
    {/* Large heading above the video */}
    <div className="hero-heading-container">
    <h1 className="hero-heading">SWING WITH CONFIDENCE</h1>
    </div>
    <div
    className="hero-container"
    style={{
        width: containerWidth,
        height: containerHeight,
        borderRadius: borderRadius,
        margin: "0 auto",
        transition: "all 0.3s ease"
    }}
    >
    <video
        className="hero-video"
        src=""
        autoPlay
        muted
        loop
        playsInline
    />
    <div className="hero-content">
        <button className="learn-more">Learn More</button>
        <div className="scroll-button-container">
            <button className="scroll-button" onClick={handleClick}>
                <span className="arrow">&#x2193;</span>
            </button>
        </div>
    </div>
    <div id="new-section"> </div>
    </div>
</div>
);
};

export default HeroSection;
