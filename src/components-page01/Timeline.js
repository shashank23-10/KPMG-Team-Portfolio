import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import "./Timeline.css";
import swirlVideo from "../assets/BGVideo.mp4";
import stepsData from "../variablefiles/stepsData.jsx";
import RollingSlider from "../background/RollingSlider.js";

export default function Timeline() {
  // Parse query parameters to find an activeStep value
  const searchParams = new URLSearchParams(window.location.search);
  const activeStepParam = searchParams.get("activeStep");

  // Determine the initial active step index from stepsData (default to 0)
  let initialStep = 0;
  if (activeStepParam) {
    const index = stepsData.findIndex(
      (step) => step.id.toString() === activeStepParam
    );
    if (index !== -1) {
      initialStep = index;
    }
  }

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [prevStep, setPrevStep] = useState(initialStep);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for previous
  const [animating, setAnimating] = useState(false);

  // Function to change steps with animation
  const changeStep = (newStep, newDirection) => {
    if (newStep === currentStep) return;
    setDirection(newDirection);
    setPrevStep(currentStep);
    setCurrentStep(newStep);
    setAnimating(true);
    // Match this timeout with the CSS animation duration (0.6s below)
    setTimeout(() => {
      setAnimating(false);
    }, 2000);
  };

  const handleNext = () => {
    const nextStep = (currentStep + 1) % stepsData.length;
    changeStep(nextStep, 1);
  };

  const handlePrev = () => {
    const prevIndex = currentStep === 0 ? stepsData.length - 1 : currentStep - 1;
    changeStep(prevIndex, -1);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  // New useEffect to handle projects-list animation on step change
  useEffect(() => {
    const projectsList = document.querySelector('.projects-list');
    if (!projectsList) return;
    // Remove any previous animation classes
    projectsList.classList.remove('enter', 'exit');
    // Trigger exit animation
    projectsList.classList.add('exit');
    // After exit animation, remove exit and trigger enter animation
    setTimeout(() => {
      projectsList.classList.remove('exit');
      projectsList.classList.add('enter');
    }, 600);
  }, [currentStep]);

  useEffect(() => {
    document.body.className = "innovation-page";
    return () => {
      document.body.className = "";
    };
  }, []);

  return (
    <div className="innovation-container" {...handlers}>
      <div className="main-content">
        {/* Left Panel */}
        <div className="left-panel">
          <div className="vertical-title-left">
            <div className="vertical-title-content">
              <span>SOLUTIONS</span>
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
                key={index}
                className={`solution-item ${index === currentStep ? "active" : ""}`}
                onClick={() => changeStep(index, index > currentStep ? 1 : -1)}
              >
                {step.iconComponent && <step.iconComponent className="solution-icon" />}
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
                <div className={`img-wrapper ${direction === 1 ? "slide-out-left" : "slide-out-right"}`}>
                  <img
                    src={stepsData[prevStep].imageUrl}
                    alt={stepsData[prevStep].zone}
                    className={`center-building-img step-${prevStep}`}
                  />
                </div>
                <div className={`img-wrapper ${direction === 1 ? "slide-in-right" : "slide-in-left"}`}>
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
              <span>PROJECTS</span>
            </div>
          </div>
          <ul className="projects-list">
            {stepsData[currentStep].projects.map((project, index) => (
              <li key={index} className="project-card">
                <div className="project-thumbnail-wrapper">
                  <a key={project.title} href={project.href}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-thumbnail"
                    />
                    <div className="project-title-overlay">
                      {project.title}
                    </div>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <a href={stepsData[currentStep].href}>
            <button className="explore-more-btn">Explore More</button>
          </a>
        </div>
      </div>
      <div className="slider-indicators">
        {stepsData.map((_, index) => (
          <span
            key={index}
            className={`slider-bullet ${index === currentStep ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
