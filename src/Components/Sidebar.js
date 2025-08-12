import React, { useState } from "react";
import "../Styles/sidebar.css";

export default function Sidebar({ setActiveSection }) {
  const [active, setActive] = useState("overview");

  const navLinks = [
    { id: "overview", name: "Dashboard", icon: "fas fa-chart-line" },
    { id: "orders", name: "Orders", icon: "fas fa-shopping-bag" },
    { id: "menu", name: "Menu", icon: "fas fa-utensils" },
    { id: "customers", name: "Customers", icon: "fas fa-users" },
    { id: "analytics", name: "Analytics", icon: "fas fa-chart-bar" },
    { id: "settings", name: "Settings", icon: "fas fa-cog" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-circle">ምኣ</div>
        <div>
          <h1>Admin Panel</h1>
          <p>ምዓም ኣምበሳ</p>
        </div>
      </div>
      <nav>
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={active === link.id ? "active" : ""}
              onClick={() => {
                setActive(link.id);
                setActiveSection(link.id);
              }}
            >
              <i className={link.icon}></i>
              <span style={{ marginLeft: "10px" }}>{link.name}</span>
            </li>
          ))}
        </ul>
      </nav>
      <hr className="sidebar-divider" />
      <div
        className={`logout ${active === "logout" ? "active" : ""}`}
        onClick={() => {
          setActive("logout");
          window.location.reload();
        }}
      >
        <i className="fas fa-sign-out-alt"></i>
        <span style={{ marginLeft: "10px" }}>Logout</span>
      </div>
    </div>
  );
}
