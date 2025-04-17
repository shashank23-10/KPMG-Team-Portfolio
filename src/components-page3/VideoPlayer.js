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
  const videoSrc = videoMapping[videoId] || video1;
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

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const sliderStyle = {
    background: `linear-gradient(90deg, #003087 0%, #003087 ${progressPercentage}%, #ccc ${progressPercentage}%, #ccc 100%)`,
  };

  const volumePercentage = volume * 100;
  const volumeSliderStyle = {
    background: `linear-gradient(90deg, #003087 0%, #003087 ${volumePercentage}%, #ccc ${volumePercentage}%, #ccc 100%)`,
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
    const videoEl = videoRef.current;
    if (videoEl.requestFullscreen) videoEl.requestFullscreen();
    else if (videoEl.webkitRequestFullscreen) videoEl.webkitRequestFullscreen();
    else if (videoEl.mozRequestFullScreen) videoEl.mozRequestFullScreen();
    else if (videoEl.msRequestFullscreen) videoEl.msRequestFullscreen();
  };

  const handleProgressChange = (e) => {
    videoRef.current.currentTime = parseFloat(e.target.value);
    setCurrentTime(parseFloat(e.target.value));
  };

  const handleTimeUpdate = () => setCurrentTime(videoRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(videoRef.current.duration);

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    videoRef.current.muted = newMute;
    setVolume(newMute ? 0 : 1);
    if (!newMute) videoRef.current.volume = 1;
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    videoRef.current.volume = newVol;
    setIsMuted(newVol === 0);
    videoRef.current.muted = newVol === 0;
  };

  const resetControlsTimer = () => {
    setControlsVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 5000);
  };

  const handleMouseMove = (e) => {
    setIsPointerTop(e.clientY <= window.innerHeight * 0.2);
    resetControlsTimer();
  };

  // 🔥 Play/Pause on entire screen click
  const handleScreenClick = (e) => {
    // Ignore clicks on buttons or input sliders
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "INPUT" ||
      e.target.closest(".controls-overlay")
    ) {
      return;
    }
    isPlaying ? handlePause() : handlePlay();
  };

  useEffect(() => {
    resetControlsTimer();
    return () => clearTimeout(hideTimer.current);
  }, []);

  return (
    <div className="video-player-fullscreen" onClick={handleScreenClick}>
    {/* ⬆️ Custom navbar on top - completely outside */}
    <div className="custom-video-navbar">
        <div className="navbar-left">
        <img src={Logo} alt="KPMG Logo" className="nav-logo-img" />
        <h1 className="nav-title">Intelligent Solutions - Infinite Possibilities</h1>
        </div>
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

        {/* Go Back */}
        <Link
          to={videoCard ? `/swiper/${videoCard.page}?activeStep=${videoCard.id}` : "/"}
          className={`go-back-button ${controlsVisible && isPointerTop ? "visible" : "hidden"}`}
        >
          <img src={arrowIcon} alt="Go Back" />
          <span>Go Back</span>
        </Link>

        {/* Controls */}
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
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
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
