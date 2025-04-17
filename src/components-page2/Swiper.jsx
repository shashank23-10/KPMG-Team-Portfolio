// src/components/Swiper.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './Swiper.css';
import cards from '../variablefiles/cards.jsx';
import { FaArrowLeftLong } from "react-icons/fa6";

function Swiper() {
  const { pageId } = useParams();
  const { search } = useLocation();

  // Filter the cards based on the URL parameter using custom property "page"
  const filteredCards = cards.filter(card => String(card.page) === pageId);
  const cardsToShow = filteredCards.length > 0 ? filteredCards : cards;
  const n = cardsToShow.length;

  // Read “activeStep” from the URL so we can jump back to that card
  const activeStep = new URLSearchParams(search).get('activeStep');
  const initialIndex = cardsToShow.findIndex(c => c.id.toString() === activeStep);

  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [disableTransition, setDisableTransition] = useState(false);
  const prevIndexRef = useRef(0);

  // Slideshow state
  const [isHovered, setIsHovered] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  // Reference to store the interval ID for the slideshow
  const slideshowIntervalRef = useRef(null);

  // Reset slideshowIndex when current card changes
  useEffect(() => {
    setSlideshowIndex(0);
  }, [currentIndex]);

  // When not hovered, stop the interval and reset slideshowIndex to 0.
  useEffect(() => {
    if (isHovered) {
      const activeCard = cardsToShow[currentIndex];
      if (activeCard.images && activeCard.images.length > 1) {
        slideshowIntervalRef.current = setInterval(() => {
          setSlideshowIndex(prev => (prev + 1) % activeCard.images.length);
        }, 7500);
      }
    } else {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
      setSlideshowIndex(0);
    }
    return () => {
      if (slideshowIntervalRef.current) {
        clearInterval(slideshowIntervalRef.current);
        slideshowIntervalRef.current = null;
      }
    };
  }, [isHovered, currentIndex, cardsToShow]);

  // Calculate the circular offset used for layout animations
  const getOffset = (index) => {
    let diff = index - currentIndex;
    if (diff > n / 2) {
      diff -= n;
    } else if (diff < -n / 2) {
      diff += n;
    }
    return diff;
  };

  const prevCard = () => {
    const newIndex = currentIndex === 0 ? n - 1 : currentIndex - 1;
    if (currentIndex === 0 && newIndex === n - 1) {
      setDisableTransition(true);
    }
    prevIndexRef.current = currentIndex;
    setCurrentIndex(newIndex);
  };

  const nextCard = () => {
    const newIndex = currentIndex === n - 1 ? 0 : currentIndex + 1;
    if (currentIndex === n - 1 && newIndex === 0) {
      setDisableTransition(true);
    }
    prevIndexRef.current = currentIndex;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (disableTransition) {
      const timer = setTimeout(() => setDisableTransition(false), 50);
      return () => clearTimeout(timer);
    }
  }, [disableTransition]);

  useEffect(() => {
    document.body.className = 'swiper-page';
    return () => {
      document.body.className = '';
    };
  }, []);

  return (
    <div className="swiper-container">
      {/* Go Back Button */}
      <Link to={`/?activeStep=${pageId}`} className='go-back-btn'>
        <span className="arrow"><FaArrowLeftLong /></span>
        <span className="text">Explore other solutions</span>
      </Link>
      
      {/* Navigation Buttons */}
      <button className="nav-button nav-button--left" onClick={prevCard}>
        &#10094;
      </button>
      <button className="nav-button nav-button--right" onClick={nextCard}>
        &#10095;
      </button>

      {/* Cards Container */}
      <div className="cards-container">
        {cardsToShow.map((card, index) => {
          const offset = getOffset(index);
          const imgSrc = (offset === 0 && card.images && card.images.length > 0)
                          ? card.images[slideshowIndex]
                          : card.image;
          const imgClass = (offset === 0 && isHovered && card.images && card.images.length > 1)
                          ? "zoom"
                          : "";
          
          return (
            <div
              key={card.id}
              className={`card ${offset === 0 ? 'active' : ''}`}
              style={{
                '--offset': offset,
                transition: disableTransition
                  ? 'none'
                  : 'transform 0.7s ease, opacity 0.7s ease',
              }}
              onMouseEnter={offset === 0 ? () => setIsHovered(true) : undefined}
              onMouseLeave={offset === 0 ? () => setIsHovered(false) : undefined}
            >
              <img key={slideshowIndex} src={imgSrc} alt={card.title} className={imgClass} />
              <div className="feature-image-title">
                <span className="feature-image-text">{card.useCase}</span>
              </div>
              {offset === 0 && (
                <div className="inner-swiper-container">
                  <div className="left-column-swiper-container">
                    <h2 className="usecase-title">{card.useCase}</h2>
                    <p className="usecase-description">{card.useCaseDesc}</p>
                    <div className="usecase-buttons">
                      <a href={card.useCaseVideo}>
                        <button className="demo-btn">Watch Demo</button>
                      </a>
                        {card.liveDemoLink ? (
                            // enabled
                            <a
                              href={card.liveDemoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="live-btn">Experience it Live</button>
                            </a>
                          ) : (
                            // disabled
                            <a>
                            <button className="live-btn disabled" disabled>
                              Experience it Live
                            </button>
                            </a>
                          )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Global overlay */}
        <div className="card-overlay">
          <h1 className="card-overlay-title">
            {cardsToShow[currentIndex].title}
          </h1>
          <p className="card-overlay-text">
            {cardsToShow[currentIndex].text}
          </p>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="swiper-slider-indicators">
        <div className="slider-bullets">
          {cardsToShow.map((_, index) => (
            <span
              key={index}
              className={`slider-bullet ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Swiper;
