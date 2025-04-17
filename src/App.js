// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HeroSection from './components-page3/HeroSection';
import Navbar from './components-page3/Navbar';
import SubscribeSection from './components-page3/SubscribeSection';
import VideoPlayer from './components-page3/VideoPlayer';
import Timeline from './components-page01/Timeline';
import Contact from './components-page4/Contact';
import Swiper from './components-page2/Swiper';
import WaveButton from './components-btns/WaveButton';
import LandingPage from './components-page01/LandingPage';

import './App.css';
import bgVideo from './assets/BGVideo.mp4'; // pick one video (Swiper or Timeline)

const HomePage = () => (
  <>
    <HeroSection />
    <SubscribeSection />
    <VideoPlayer />
  </>
);

function App() {
  return (
    <div className="app-wrapper">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay-content">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Timeline />} />
            <Route path="/swiper/:pageId" element={<Swiper />} />
            <Route path="/video/:videoId" element={<VideoPlayer />} />
            <Route path="/3" element={<HomePage />} />
            <Route
              path="/4"
              element={
                <div
                  style={{
                    margin: '20px 0',
                    padding: '2rem',
                    background: '#1c1c1c',
                    minHeight: '10vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <WaveButton />
                </div>
              }
            />
            <Route path="/5" element={<Contact />} />
            <Route path="/6" element={<LandingPage />} />
            <Route path="/7" element={<VideoPlayer />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
