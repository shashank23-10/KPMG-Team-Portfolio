// BackgroundVideo.jsx
import React from 'react';
import './BackgroundVideo.css';
import videoSrc from "../assets/video.mp4";

const BackgroundVideo = () => {
return (
<div className="video-background">
    <video autoPlay loop muted playsInline className="background-video">
    <source src={videoSrc} type="video/mp4" />
    Your browser does not support the video tag.
    </video>
    <div className="content-overlay">
    {/* Add your content here */}
    <h1>Welcome to My Website</h1>
    </div>
</div>
);
};

export default BackgroundVideo;
