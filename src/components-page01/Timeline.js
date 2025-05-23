// src/components/Timeline.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Timeline.css";
import swirlVideo from "../assets/BGVideo.mp4";
import stepsData from "../variablefiles/stepsData.jsx";

export default function Timeline() {
  // Ref to keep track of pending timeouts
  const timeouts = useRef([]);

  // Parse query parameters for an activeStep value
  const searchParams = new URLSearchParams(window.location.search);
  const activeStepParam = searchParams.get("activeStep");

  // Determine initial active step index
  let initialStep = 0;
  if (activeStepParam) {
    const idx = stepsData.findIndex(
      (step) => step.id.toString() === activeStepParam
    );
    if (idx !== -1) initialStep = idx;
  }

  // Main step state
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [prevStep, setPrevStep] = useState(initialStep);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [animating, setAnimating] = useState(false);

  // Projects-list step state (lags behind currentStep for transitions)
  const [projectsStep, setProjectsStep] = useState(initialStep);
  const [isProjectsExiting, setIsProjectsExiting] = useState(false);
  const [isProjectsEntering, setIsProjectsEntering] = useState(false);

  // Change step with coordinated animations
  const changeStep = (newStep, newDirection) => {
    if (animating) return;               // Prevent mid-animation clicks
    if (newStep === currentStep) return;

    // Clear any existing timeouts
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    setAnimating(true);
    setDirection(newDirection);
    setPrevStep(currentStep);
    setCurrentStep(newStep);
    setIsProjectsExiting(true);

    const exitDuration = 1500; // ms, matches CSS
    const enterDuration = 1500;

    // After exit duration, swap in new projects and enter
    const exitTimeout = setTimeout(() => {
      setIsProjectsExiting(false);
      setProjectsStep(newStep);
      setIsProjectsEntering(true);

      const enterTimeout = setTimeout(() => {
        setIsProjectsEntering(false);
      }, enterDuration);
      timeouts.current.push(enterTimeout);
    }, exitDuration);
    timeouts.current.push(exitTimeout);

    // Clear animating flag after full cycle
    const clearAnimTimeout = setTimeout(() => {
      setAnimating(false);
    }, exitDuration + enterDuration);
    timeouts.current.push(clearAnimTimeout);
  };

  const handleNext = () => {
    const next = (currentStep + 1) % stepsData.length;
    changeStep(next, 1);
  };
  const handlePrev = () => {
    const prev = currentStep === 0 ? stepsData.length - 1 : currentStep - 1;
    changeStep(prev, -1);
  };

  // Set body class for page and cleanup on unmount
  useEffect(() => {
    document.body.className = "innovation-page";
    return () => {
      document.body.className = "";
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={`innovation-container ${animating ? "is-animating" : ""}`}>
      <div className="main-content">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="vertical-title-left">
            <div className="vertical-title-content">
              <span>FOCUS AREAS</span>
              <img
                src={require("../assets/solutions-icon.png")}
                alt="Solutions Icon"
                className="vertical-icon"
              />
            </div>
          </div>
          <ul className="solutions-list">
            {stepsData.map((step, index) => (
              <li
                key={step.id}
                className={`solution-item ${
                  index === currentStep ? "active" : ""
                }`}
                onClick={() =>
                  changeStep(index, index > currentStep ? 1 : -1)
                }
              >
                {step.iconComponent && (
                  <step.iconComponent className="solution-icon" />
                )}
                {step.zone}
              </li>
            ))}
          </ul>
        </div>

        {/* Left Description */}
        <div className="left-description-container">
          {animating ? (
            <>
              <div className="left-description fade-out">
                <p>{stepsData[prevStep].leftDesc}</p>
              </div>
              <div className="left-description fade-in">
                <p>{stepsData[currentStep].leftDesc}</p>
              </div>
            </>
          ) : (
            <div className="left-description">
              <p>{stepsData[currentStep].leftDesc}</p>
            </div>
          )}
        </div>

        {/* Center Panel */}
        <div className="center-panel">
          <div className="center-top">
            {animating ? (
              <>
                <div
                  className={`img-wrapper ${
                    direction === 1 ? "slide-out-left" : "slide-out-right"
                  }`}
                >
                  <img
                    src={stepsData[prevStep].imageUrl}
                    alt={stepsData[prevStep].zone}
                    className={`center-building-img step-${prevStep}`}
                  />
                </div>
                <div
                  className={`img-wrapper ${
                    direction === 1 ? "slide-in-right" : "slide-in-left"
                  }`}
                >
                  <img
                    src={stepsData[currentStep].imageUrl}
                    alt={stepsData[currentStep].zone}
                    className={`center-building-img step-${currentStep}`}
                  />
                </div>
              </>
            ) : (
              <div className="img-wrapper static">
                <img
                  src={stepsData[currentStep].imageUrl}
                  alt={stepsData[currentStep].zone}
                  className={`center-building-img step-${currentStep}`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="vertical-title-right">
            <div className="vertical-title-content">
              <img
                src={require("../assets/projects-icon.png")}
                alt="Projects Icon"
                className="vertical-icon"
              />
              <span>SOLUTIONS</span>
            </div>
          </div>

          {/* Projects List with exit/enter animations */}
          <ul
            className={`projects-list ${
              isProjectsExiting ? "exit" : isProjectsEntering ? "enter" : ""
            }`}
          >
            {stepsData[projectsStep].projects.map((project) => (
              <li key={project.id} className="project-card">
                <div className="project-thumbnail-wrapper">
                  <Link
                    to={`/swiper/${stepsData[projectsStep].id}?activeStep=${project.id}`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-thumbnail"
                    />
                    <div className="project-title-overlay">
                      {project.title}
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <Link to={stepsData[currentStep].href}>
            <button className="explore-more-btn">Explore More</button>
          </Link>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="slider-indicators">
        {stepsData.map((_, index) => (
          <span
            key={index}
            className={`slider-bullet ${
              index === currentStep ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
