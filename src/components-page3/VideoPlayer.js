// src/components/VideoPlayer.jsx
import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
FaPlay,
FaPause,
FaStop,
FaVolumeUp,
FaVolumeMute,
FaExpand
} from "react-icons/fa";
import "./VideoPlayer.css";
import arrowIcon from "../assets/arrow-icon.png";
import cards from "../variablefiles/cards.jsx";
import Logo from "../assets/KPMG Logo.png";


// S3 video URLs
const video1 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/1_Enterprise_Innovation/InnovationCentre/Innovation_Center.mp4";
const video2 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/1_Enterprise_Innovation/Lighthouse/Lighthouse_arena.mp4";
const video3 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/2_CustomerEngagement/ExperienceStore/Experience_Store.mp4";
const video4 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/2_CustomerEngagement/ServiceCenter/Service_Center.mp4";
const video5 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/2_CustomerEngagement/VirtualMall/Virtual_Mall.mp4";
const video6 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/3_Employee_Experience/HROnBoarding/HR_OnBoarding.mp4";
const video7 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/3_Employee_Experience/OneBC/OneBC_Explore.mp4";
// const video8 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/4_Knowledge_Management/Cipla/Cipla.mp4";
const video9 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/4_Knowledge_Management/KBL/KBL_C.mp4";
const video10 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/4_Knowledge_Management/ONGC-exe/Ongc.mp4";
const video11 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/4_Knowledge_Management/ShivanE/KPMG_Kaleidoscope_ShivanE.mp4";
const video12 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/5_LnD/CPCL/CPCL.mp4";
const video13 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/5_LnD/ReLearn/Relearn.mp4";
const video14 = "https://dfa6lpn2gurde.cloudfront.net/assets-ds-portfolio/5_LnD/Shell/Shell.mp4";

const videoMapping = {
"1": video1,
"2": video2,
"3": video3,
"4": video4,
"5": video5,
"6": video6,
"7": video7,
// "8": video8,
"9": video9,
"10": video10,
"11": video11,
"12": video12,
"13": video13,
"14": video14,
};

const VideoPlayer = () => {
const { videoId } = useParams();
const videoSrc = videoMapping[videoId] || videoMapping["1"];
const videoCard = cards.find(card => card.id.toString() === videoId);

const videoRef = useRef(null);
const hideTimer = useRef(null);

const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);
const [volume, setVolume] = useState(1);
const [isMuted, setIsMuted] = useState(false);
const [controlsVisible, setControlsVisible] = useState(true);
const [isPointerTop, setIsPointerTop] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);

// NEW: show Go-Back for first 2s
const [showGoBackInitially, setShowGoBackInitially] = useState(true);

const formatTime = (t) => {
    const m = Math.floor(t / 60), s = Math.floor(t % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
};

const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
// UPDATED: before metadata loads, keep slider fully blue
const sliderStyle = duration > 0
? {
    background: `linear-gradient(90deg, white 0%, white ${progressPercentage}%, #8f8b81 ${progressPercentage}%, #8f8b81 100%)`
}
: {
    background: `white`
};

// percentage 0–100
const volumePercentage = volume * 100;

// always draw a gradient: white up to the filled %; off‑white thereafter
const volumeSliderStyle = {
  background: `linear-gradient(
    90deg,
    white 0%,
    white ${volumePercentage}%,
    #8f8b81 ${volumePercentage}%,
    #8f8b81 100%
  )`
};

const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
};
const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
};
const handleFullScreen = () => {
    const el = videoRef.current;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
};
const handleProgressChange = (e) => {
    const t = parseFloat(e.target.value);
    videoRef.current.currentTime = t;
    setCurrentTime(t);
};
const handleTimeUpdate = () => setCurrentTime(videoRef.current.currentTime);
const handleLoadedMetadata = () => setDuration(videoRef.current.duration);
const toggleMute = () => {
    const m = !isMuted;
    setIsMuted(m);
    videoRef.current.muted = m;
    setVolume(m ? 0 : 1);
    if (!m) videoRef.current.volume = 1;
};
const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    videoRef.current.volume = v;
    setIsMuted(v === 0);
    videoRef.current.muted = v === 0;
};

const resetControlsTimer = () => {
    setControlsVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 5000);
};
const handleMouseMove = (e) => {
    const start = window.innerHeight * 0.1;  // 10%
    const end   = window.innerHeight * 0.3;  // 30%
    // true when pointer is between 10% and 30% of viewport height
    setIsPointerTop(e.clientY >= start && e.clientY <= end);
    resetControlsTimer();
};
const handleScreenClick = (e) => {
    if (
    e.target.tagName === "BUTTON" ||
    e.target.tagName === "INPUT" ||
    e.target.closest(".controls-overlay")
    ) return;
    isPlaying ? handlePause() : handlePlay();
};

useEffect(() => {
    // Start hide-timer for controls
    resetControlsTimer();
    // 🔁 Hide Go‑Back after 2s
    const goBackTimer = setTimeout(() => setShowGoBackInitially(false), 2000);
    // 🔊 Autoplay on load
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { /* muted-required autoplay */ });

    return () => {
    clearTimeout(hideTimer.current);
    clearTimeout(goBackTimer);
    };
}, []);

return (
    <div className="video-player-fullscreen" onClick={handleScreenClick}>
    {/* Custom navbar */}
    <div className="custom-video-navbar">
        <Link to="/" className="navbar-links">
        <div className="navbar-left">
            <img src={Logo} alt="KPMG Logo" className="nav-logo-img" />
            <h1 className="nav-title">Intelligent Solutions - Infinite Possibilities</h1>
        </div>
        </Link>
    </div>

    <div className="video-player-container" onClick={handleScreenClick}>
        <div className="video-wrapper" onMouseMove={handleMouseMove}>
        <video
            ref={videoRef}
            src={videoSrc}
            className="video-element"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
        />

        {/* Go Back button */}
        <Link
            to={videoCard ? `/swiper/${videoCard.page}?activeStep=${videoCard.id}` : "/"}
            className={`go-back-button ${(showGoBackInitially || (controlsVisible && isPointerTop)) ? "visible" : "hidden"}`}
        >
            <img src={arrowIcon} alt="Go Back" />
            <span>Go Back</span>
        </Link>

        {/* Controls overlay */}
        <div
            className={`controls-overlay ${controlsVisible ? "visible" : "hidden"}`}
            onMouseEnter={() => { clearTimeout(hideTimer.current); setControlsVisible(true); }}
            onMouseLeave={resetControlsTimer}
        >
            <input
            type="range"
            className="progress-slider"
            value={currentTime}
            min="0"
            max={duration}
            step="0.1"
            onChange={handleProgressChange}
            style={sliderStyle}
            />
            <div className="controls-buttons">
            <div className="controls-left">
                <button onClick={isPlaying ? handlePause : handlePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div
                className="volume-control"
                onMouseEnter={() => clearTimeout(hideTimer.current)}
                onMouseLeave={resetControlsTimer}
                >
                <button onClick={toggleMute}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
                <input
                    type="range"
                    className="volume-slider"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={volumeSliderStyle}
                />
                </div>
            </div>
            <div className="controls-right">
                <button onClick={handleFullScreen}>
                <FaExpand />
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
);
};

export default VideoPlayer;