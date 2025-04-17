import React from "react";
import "./RollingSlider.css";
import stepsData from "../variablefiles/stepsData";

const RollingSlider = ({ currentStep }) => {
return (
<div className="rolling-slider-container">
    {/* Grey line behind the icons */}
    <div className="rolling-slider-line" />

    {/* Container holding all icons */}
    <div className="rolling-slider-icons">
    {stepsData.map((icon, i) => {
        // Determine how far this icon is from the active/current step
        let distance = i - currentStep;

        // Wrap-around logic so the carousel appears seamless on both ends
        if (distance < -Math.floor(stepsData.length / 2)) {
        distance += stepsData.length;
        } else if (distance > Math.floor(stepsData.length / 2)) {
        distance -= stepsData.length;
        }

        // Center icon is largest; scale decreases with distance
        const scale = Math.max(0.5, 1 - 0.25 * Math.abs(distance));
        // Adjust horizontal offset; tweak multiplier to adjust spacing
        const offset = distance * 80;
        // Icons closer to center are rendered on top (higher z-index)
        const zIndex = stepsData.length - Math.abs(distance);

        return (
        <div
            key={icon.id}
            className={`rolling-slider-icon ${i === currentStep ? "active" : ""}`}
            style={{
                left: '50%',
                transform: `translateX(${offset}px) translate(-50%, -50%) scale(${scale})`,
                zIndex: zIndex,
            }}
        >
            {icon.type === "icon" ? (
            <icon.iconComponent size={28} />
            ) : (
            <img src={icon.src} alt="icon" />
            )}
        </div>
        );
    })}
    </div>
</div>
);
};

export default RollingSlider;
