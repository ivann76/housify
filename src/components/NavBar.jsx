// src/components/Navbar.jsx
import React from 'react';
import './navbar.css'
import logoImage from "../assets/logo.png";

const Navbar = () => {
  return (
       <nav className="navbar">
        <div className="navbar-logo">
          <img src={logoImage} alt="ai" style={{ width: '150px', height: 'auto' }}/>
        </div>
        <ul className="nav-menu">
          {['Home', 'Predict', 'Trends', 'History', 'About'].map((item) => (
            <li key={item} className="nav-item">
              <a href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
  );
};

export default Navbar;