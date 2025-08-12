import React from "react";
import "../Styles/stats.css";

export default function StatsCards() {
  const stats = [
    {
      title: "Today's Orders",
      value: 24,
      change: "+12% from yesterday",
      icon: "fas fa-shopping-bag",
      iconBg: "icon-blue",
      changeColor: "text-green",
    },
    {
      title: "Revenue Today",
      value: "8,450 ETB",
      change: "+8% from yesterday",
      icon: "fas fa-dollar-sign",
      iconBg: "icon-green",
      changeColor: "text-green",
    },
    {
      title: "Active Customers",
      value: 156,
      change: "+5 new today",
      icon: "fas fa-users",
      iconBg: "icon-purple",
      changeColor: "text-blue",
    },
    {
      title: "Avg. Order Value",
      value: "352 ETB",
      change: "-3% from yesterday",
      icon: "fas fa-chart-line",
      iconBg: "icon-orange",
      changeColor: "text-red",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, i) => (
        <div key={i} className="stat-card">
          <div>
            <p className="stat-title">{stat.title}</p>
            <p className="stat-value">{stat.value}</p>
            <p className={`stat-change ${stat.changeColor}`}>
              {stat.change}
            </p>
          </div>
          <div className={`icon-box ${stat.iconBg}`}>
            <i className={stat.icon}></i>
          </div>
        </div>
      ))}
    </div>
  );
}
