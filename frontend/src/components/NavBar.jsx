import React from 'react';
import { Link } from 'react-router-dom';  // Add this import
import './navbar.css';
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
            <Link
              to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
              className="nav-link"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;