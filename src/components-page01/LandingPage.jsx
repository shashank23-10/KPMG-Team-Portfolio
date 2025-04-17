import React, { useState } from 'react';
import './LandingPage.css';

import slider1 from "../assets/slider-1.png";
import slider2 from "../assets/slider-2.png";
import slider3 from "../assets/slider-3.png";
import slider4 from "../assets/slider-4.png";

const LandingPage = () => {

// Sidebar menu items, each with a unique ID, label, image, and text
const menuItems = [
{
    id: 'workforce',
    label: 'Workforce',
    image: slider1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Workforce lorem ipsum text goes here.',
},
{
    id: 'ai',
    label: 'AI and Technology',
    image: slider2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. AI & Technology lorem ipsum text goes here.',
},
{
    id: 'risk',
    label: 'Future of Risk',
    image: slider3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Future of Risk lorem ipsum text goes here.',
},
{
    id: 'transformation',
    label: 'Transformation',
    image: slider4,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Transformation lorem ipsum text goes here.',
},
];

// Track which item is active
const [activeItemId, setActiveItemId] = useState(menuItems[0].id);

// Find the active item in the menu array
const activeItem = menuItems.find((item) => item.id === activeItemId);

// Handle sidebar clicks
const handleMenuClick = (id) => {
setActiveItemId(id);
};

return (
<div className="landing-page">
    {/* Sidebar */}
    <aside className="sidebar">
    <ul className="sidebar-list">
        {menuItems.map((item) => (
        <li
            key={item.id}
            className={`sidebar-item ${
            item.id === activeItemId ? 'active' : ''
            }`}
            onClick={() => handleMenuClick(item.id)}
        >
            {item.label}
        </li>
        ))}
    </ul>
    </aside>

    {/* Main Content Area */}
    <div className="content-area">
    {/* Background Image */}
    {activeItem && (
        <img
        src={activeItem.image}
        alt={activeItem.label}
        className="content-image"
        />
    )}

    {/* Text Overlay (bottom-right) */}
    {activeItem && (
        <div className="text-overlay">
        <p>{activeItem.text}</p>
        </div>
    )}
    </div>
</div>
);
};

export default LandingPage;
