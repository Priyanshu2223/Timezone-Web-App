import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/products");
  };

  return (
    <div className="splash-container">
      <video autoPlay muted loop className="bg-video">
        <source src="/landing.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <motion.img
          src="/timezone-logo.png"
          alt="TimeZone Logo"
          className="logo"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
        />

        <motion.h1
          className="tagline"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Elegance in Every Tick
        </motion.h1>

        <motion.button
          className="enter-btn"
          whileHover={{ scale: 1.05 }}
          onClick={handleEnter}
        >
          Enter Store
        </motion.button>
      </div>
    </div>
  );
};

export default SplashScreen;
