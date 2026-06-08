import React from "react";
import "../Styles/header.css"

export default function Header({ activeSection }) {
  const titles = {
    overview: "Dashboard Overview",
    orders: "Order Management",
    menu: "Menu Management",
    customers: "Customer Management",
    analytics: "Analytics & Reports",
    deliverers: "Deliverer Management",
    report: "Reports",
    settings: "Restaurant Settings",
  };

  return (
    <header className="header">
      <h2>{titles[activeSection]}</h2>
      <div className="admin-info">
        <div className="avatar">A</div>
        <div>
          <p>Admin User</p>
          <small>Administrator</small>
        </div>
      </div>
    </header>
  );
}
