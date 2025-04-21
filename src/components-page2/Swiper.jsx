import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './Swiper.css';
import cards from '../variablefiles/cards.jsx';
import { FaArrowLeftLong } from 'react-icons/fa6';

function Swiper() {
  const { pageId } = useParams();
  const { search } = useLocation();

  const filteredCards = cards.filter(card => String(card.page) === pageId);
  const cardsToShow = filteredCards.length > 0 ? filteredCards : cards;
  const n = cardsToShow.length;

  const activeStep = new URLSearchParams(search).get('activeStep');
  const initialIndex = cardsToShow.findIndex(c => c.id.toString() === activeStep);
  const [currentIndex, setCurrentIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [isHovered, setIsHovered] = useState(false);
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const slideshowIntervalRef = useRef(null);
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    setSlideshowIndex(0);
  }, [currentIndex]);

  useEffect(() => {
    if (isHovered) {
      const activeCard = cardsToShow[currentIndex];
      if (activeCard.images && activeCard.images.length > 1) {
        slideshowIntervalRef.current = setInterval(() => {
          setSlideshowIndex(prev => (prev + 1) % activeCard.images.length);
        }, 7500);
      }
    } else {
      clearInterval(slideshowIntervalRef.current);
      slideshowIntervalRef.current = null;
      setSlideshowIndex(0);
    }
    return () => clearInterval(slideshowIntervalRef.current);
  }, [isHovered, currentIndex, cardsToShow]);

  const getOffset = index => {
    let diff = index - currentIndex;
    if (diff > n / 2) diff -= n;
    else if (diff < -n / 2) diff += n;
    return diff;
  };

  const [isChanging, setIsChanging] = useState(false);
  const [canHover, setCanHover] = useState(true);


  const prevCard = () => {
    if (isChanging) return; // prevent re-triggering
    setIsChanging(true);
    setCanHover(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex === 0 ? n - 1 : currentIndex - 1);
      setIsChanging(false);
      setCanHover(true); // Re-enable hover after transition
    }, 250); // 250ms delay
  };

  const nextCard = () => {
    if (isChanging) return;
    setIsChanging(true);
    setCanHover(false);
    setTimeout(() => {
      setCurrentIndex(currentIndex === n - 1 ? 0 : currentIndex + 1);
      setIsChanging(false);
      setCanHover(true); // Re-enable hover after transition
    }, 250); // 250ms delay
  };

  useEffect(() => {
    document.body.className = 'swiper-page';
    return () => { document.body.className = ''; };
  }, []);

  return (
    <div className="swiper-container">
      <Link to={`/?activeStep=${pageId}`} className="go-back-btn">
        <span className="arrow"><FaArrowLeftLong /></span>
        <span className="text">Explore other focus areas</span>
      </Link>

      {/* Conditionally hide prev/next when only 2 cards */}
      {!(n === 2 && currentIndex === 0) && (
        <button className="nav-button nav-button--left" onClick={prevCard}>&#10094;</button>
      )}
      {!(n === 2 && currentIndex === 1) && (
        <button className="nav-button nav-button--right" onClick={nextCard}>&#10095;</button>
      )}

      <div className="cards-container">
        {cardsToShow.map((card, index) => {
          const offset = getOffset(index);
          const imgSrc = (offset === 0 && card.images?.length > 0)
            ? card.images[slideshowIndex]
            : card.image;
          const imgClass = (offset === 0 && isHovered && card.images?.length > 1)
            ? 'zoom'
            : '';

          return (
            <div
              key={card.id}
              className={`card ${offset === 0 ? 'active has-hover-support' : ''} ${offset === 0 && hasHovered ? 'has-hovered' : ''}`}
              style={{
                '--offset': offset,
                transition: 'transform 0.7s ease-in-out, opacity 0.7s ease-in-out',
              }}
              onMouseEnter={
                offset === 0 && canHover
                  ? () => {
                      setIsHovered(true);
                      setHasHovered(true);
                    }
                  : undefined
              }
              
              onMouseLeave={
                offset === 0 ? () => setIsHovered(false) : undefined
              }              
            >
              <img src={imgSrc} alt={card.title} className={imgClass}/>
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
        <div className="card-overlay">
          <h1 className="card-overlay-title">{cardsToShow[currentIndex].title}</h1>
          <p className="card-overlay-text">{cardsToShow[currentIndex].text}</p>
        </div>
      </div>

      <div className="swiper-slider-indicators">
        <div className="slider-bullets">
          {cardsToShow.map((_, index) => (
            <span key={index} className={`slider-bullet ${index === currentIndex ? 'active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Swiper;
