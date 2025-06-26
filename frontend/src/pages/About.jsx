import React from 'react';
import { Brain, Star, ArrowRight, CheckCircle, Home, LineChart, Database } from 'lucide-react';
import './About.css';
import NavBar from "../components/NavBar";
import jorhow from "../assets/Jorhow.jpeg";
import yuzheng from "../assets/YuZheng.jpeg";
import jianhan from "../assets/JianHan.jpeg";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: <LineChart size={24} />,
      title: "Accurate Predictions",
      description: "Our model provides reliable price estimates based on comprehensive data analysis"
    },
    {
      icon: <Database size={24} />,
      title: "Rich Dataset",
      description: "Trained on thousands of property listings with diverse features"
    },
    {
      icon: <Brain size={24} />,
      title: "Machine Learning",
      description: "Utilizes advanced algorithms to identify pricing patterns"
    },
    {
      icon: <Home size={24} />,
      title: "User-Friendly",
      description: "Simple interface designed for home buyers and sellers"
    }
  ];

  const teamMembers = [
    {
      name: "Loh Jian Han",
      role: "UI/UX Design",
      image: jianhan
    },
    {
      name: "Jorhow Wong",
      role: "Data Processing",
      image: jorhow
    },
    {
      name: "Heong Yu Zheng",
      role: "Model Development",
      image: yuzheng
    }
  ];

  const navigate = useNavigate();
  const handleTryModel = () => {
    navigate('/predict'); // Navigate to prediction page
  };

  return (
    <div className="about-container">
      <NavBar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge">
            <Star size={16} style={{ marginRight: '0.5rem' }} />
            COS30049 AI Group Project
          </div>
          <h1 className="hero-title">
            Housing Price
            <span className="gradient-text">
              Prediction Model
            </span>
          </h1>
          <p className="hero-description">
            Our team has developed a machine learning model that predicts housing prices
            based on various property features, helping buyers and sellers make informed decisions.
          </p>
          <div className="button-group">
            <button className="primary-button" onClick={handleTryModel}>
              Try Our Model
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Project Features</h2>
            <p className="section-subtitle">
              Our housing price prediction model offers several key benefits
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-grid">
          <div>
            <h2 className="mission-title">Our Approach</h2>
            <p className="mission-description">
              As computer science students, we applied our classroom knowledge to solve
              a real-world problem by developing this housing price prediction model.
            </p>
            <ul className="mission-list">
              {[
                "Data collection and cleaning",
                "Feature engineering",
                "Model training and evaluation",
                "Web interface development",
                "Performance optimization"
              ].map((item, index) => (
                <li key={index} className="mission-item">
                  <CheckCircle size={20} color="#86efac" style={{ marginRight: '0.75rem' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mission-card">
            <div className="mission-card-title">2025</div>
            <div className="mission-card-subtitle">Semester Project</div>
            <div className="mission-stats">
              <div>
                <div className="mission-stat-value">3</div>
                <div className="mission-stat-label">Team Members</div>
              </div>
              <div>
                <div className="mission-stat-value">14</div>
                <div className="mission-stat-label">Weeks Development</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title">Our Team</h2>
            <p className="section-subtitle">
              Computer Science students passionate about data and website machine learning
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img
                  src={member.image}
                  alt={member.name}
                  className="team-image"
                />
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-content">
          <h2 className="cta-title">Want to Learn More?</h2>
          <p className="cta-description">
            Check out our project documentation or try our housing price prediction model
          </p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={handleTryModel}>
              Try the Model
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;