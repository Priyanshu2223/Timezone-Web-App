import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Auth.css";


function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    try {
      const res = await axios.post(url, form);
      alert("✅ Success: " + (isLogin ? "Logged In" : "Registered"));
      console.log(res.data);
    } catch (err) {
      alert("❌ Error: " + err.response.data.msg);
    }
  };

  return (
    <motion.div className="auth-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.h2 layout>{isLogin ? "Login" : "Signup"}</motion.h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <motion.input
            layout
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        )}
        <motion.input
          layout
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <motion.input
          layout
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <motion.button layout type="submit">
          {isLogin ? "Login" : "Register"}
        </motion.button>
      </form>
      <motion.p layout onClick={toggleForm}>
        {isLogin ? "New here? Register" : "Already have an account? Login"}
      </motion.p>
    </motion.div>
  );
}

export default Auth;
