import React from "react";
import "./SubscribeSection.css";

const SubscribeSection = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for subscribing!");
};

return (
    <div className="subscribe-section">
        <div className="project-details">
            <h2>PROJECT 01</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
        <div className="explore-btn">
            <button type="submit">Explore </button>
        </div>
    </div>
);
};

export default SubscribeSection;
