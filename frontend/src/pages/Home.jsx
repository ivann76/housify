
import React from 'react';
import NavBar from '../components/NavBar';
import aiImage from '../assets/ai.png';
import '../style.css'
import {useNavigate} from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleTryNowBtn = () => {
    navigate('/predict');
  };

   const handleAboutBtn = () => {
    navigate('/about');
  };

  return (
    <div className="app">
      <NavBar/>
      <section className="hero-section">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Predict Housing<br />
            Prices with AI
          </h1>

          <p className="hero-description">
            Get instant price estimates for homes in Selangor based on location,
            size, and market trends — powered by machine learning
          </p>

          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={handleTryNowBtn}>
              Try Now
            </button>

            <button className="btn btn-secondary" onClick={handleAboutBtn}>
              About
            </button>
          </div>
        </div>

        {/* Right Content - Robot Image */}
        <div className="hero-image">
          <img className="robot-logo" src={aiImage} />
        </div>
      </section>
    </div>
  );
};

export default Home;