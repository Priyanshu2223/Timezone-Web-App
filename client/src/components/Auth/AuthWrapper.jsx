import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./../styles/Auth.css";

const AuthWrapper = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        {isLogin ? <Login /> : <Signup />}
        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthWrapper;
