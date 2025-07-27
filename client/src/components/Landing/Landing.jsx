import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import logo from "../../assets/timezone-logo.png";
import bgVideo from "../../assets/landing.mp4";

const Landing = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  const handleEnter = () => {
    navigate("/products");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landing-container">
      <video className="video-bg" autoPlay muted loop>
        <source src={bgVideo} type="video/mp4" />
      </video>

      <img src={logo} alt="TimeZone Logo" className="logo" />

      {showContent && (
        <>
          <div className="left-header fade-in-left gradient-box">
            <h1>Welcome to TimeZone</h1>
            <p>
              Elevating luxury since 2025. Each watch is a masterpiece,
              engineered to perfection and styled with timeless elegance.
              <br />
              <br />
              ✔ Premium materials & craftsmanship
              <br />
              ✔ Hand-assembled with precision
              <br />
              ✔ Limited edition collections
            </p>
          </div>

          <div className="right-tagline fade-in-right gradient-box">
            <h2>Elegance in Every Tick</h2>
            <p>
              Experience the blend of heritage and design.
              <br />
              Timekeeping redefined with modern innovation.
            </p>
            <button className="enter-button" onClick={handleEnter}>
              Enter Store
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Landing;
