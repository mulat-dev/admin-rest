import React, { useState } from "react";
import "../Styles/login.css";

export default function LoginModal({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@miamambesa.com" && password === "admin123") {
      onLogin();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-modal">
      <div className="login-box">
        <div className="logo">ምኣ</div>
        <h2>Admin Login</h2>
        <p>ምዓም ኣምበሳ Management</p>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@miamambesa.com"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
          <button type="submit">Login to Dashboard</button>
        </form>
        <div className="demo-credentials">
          <p><strong>Email:</strong> admin@miamambesa.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </div>
    </div>
  );
}
