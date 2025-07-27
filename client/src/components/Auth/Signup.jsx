import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Signup successful");
    } catch (err) {
      alert("Signup failed: " + err.response?.data?.msg);
    }
  };

  return (
    <form onSubmit={handleSignup} className="auth-form">
      <h2>Create TimeZone Account</h2>
      <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
