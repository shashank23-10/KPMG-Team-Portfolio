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

// S3 video URLs
const video1 = "https://ds-portfolio-data.s3.us-east-1.amazonaws.com/assets-ds-portfolio/1_Enterprise_Innovation/InnovationCentre/Innovation_Center.mp4";
const video2 = "https://ds-portfolio-data.s3.us-east-1.amazonaws.com/assets-ds-portfolio/1_Enterprise_Innovation/Lighthouse/Lighthouse_arena.mp4";
const video3 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/2_CustomerEngagement/ExperienceStore/Experience_Store.mp4";
const video4 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/2_CustomerEngagement/ServiceCenter/Service_Center.mp4";
const video5 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/2_CustomerEngagement/VirtualMall/Virtual_Mall.mp4";
const video6 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/3_Employee_Experience/HROnBoarding/HR_OnBoarding.mp4";
const video7 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/3_Employee_Experience/OneBC/OneBC_Explore.mp4";
const video8 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/Cipla/Cipla.mp4";
const video9 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/KBL/KBL_C.mp4";
const video10 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/ONGC-exe/Ongc.mp4";
const video11 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/4_Knowledge_Management/ShivanE/KPMG_Kaleidoscope_ShivanE.mp4";
const video12 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/5_LnD/CPCL/CPCL.mp4";
const video13 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/5_LnD/ReLearn/Relearn.mp4";
const video14 = "https://ds-portfolio-data.s3.amazonaws.com/assets-ds-portfolio/5_LnD/Shell/Shell.mp4";

const videoMapping = {
  "1": video1,
  "2": video2,
  "3": video3,
  "4": video4,
  "5": video5,
  "6": video6,
  "7": video7,
  "8": video8,
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
  const [isPlaying, setIsPlaying] = useState(false);

  // Format seconds into mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // Progress slider background style
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const sliderStyle = {
    background: `linear-gradient(90deg, #003087 0%, #003087 ${progressPercentage}%, #ccc ${progressPercentage}%, #ccc 100%)`,
  };

  // Volume slider background style
  const volumePercentage = volume * 100;
  const volumeSliderStyle = {
    background: `linear-gradient(90deg, #003087 0%, #003087 ${volumePercentage}%, #ccc ${volumePercentage}%, #ccc 100%)`,
  };

  // Handlers for play/pause, stop, fullscreen, progress, time update, metadata
  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };
  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };
  const handleStop = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
  };
  const handleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) {
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.msRequestFullscreen) {
      videoRef.current.msRequestFullscreen();
    }
  };
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handleTimeUpdate = () => setCurrentTime(videoRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(videoRef.current.duration);

  // Mute/unmute & volume change
  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    videoRef.current.muted = newMute;
  };
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    if (newVolume === 0) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  };

  // Show controls & reset hide timer
  const resetControlsTimer = () => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 5000);
  };
  const handleMouseMove = () => resetControlsTimer();

  useEffect(() => {
    resetControlsTimer();
    return () => hideTimer.current && clearTimeout(hideTimer.current);
  }, []);

  return (
    <div className="video-player-container">
      <div className="video-wrapper" onMouseMove={handleMouseMove}>
        <video
          ref={videoRef}
          src={videoSrc}
          className="video-element"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        {/* Go Back button now shows/hides with controls */}
        <Link
          to={videoCard ? `/swiper/${videoCard.page}` : "/"}
          className={`go-back-button ${controlsVisible ? "visible" : "hidden"}`}
        >
          <span>
            <img src={arrowIcon} alt="Go Back" />
          </span>
          <h2>Go Back</h2>
        </Link>

        {/* Controls Overlay */}
        <div className={`controls-overlay ${controlsVisible ? "visible" : "hidden"}`}>
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
              <button onClick={handleStop}>
                <FaStop />
              </button>
              <div className="volume-control">
                <button onClick={toggleMute}>
                  {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
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
              <span className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
              <button onClick={handleFullScreen}>
                <FaExpand />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
