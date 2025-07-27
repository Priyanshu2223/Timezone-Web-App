import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";           // ✅ New Landing Page
import AuthWrapper from "./components/Auth/AuthWrapper";     // ✅ Login + Signup wrapper
import ProductGallery from "./components/ProductGallery";    // ✅ Product UI

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />              {/* 🏠 Landing Page */}
        <Route path="/auth" element={<AuthWrapper />} />      {/* 🔐 Login/Signup */}
        <Route path="/products" element={<ProductGallery />} />{/* 🛍 Products Page */}
      </Routes>
    </Router>
  );
}

export default App;
