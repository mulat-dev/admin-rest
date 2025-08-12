import React from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import "../Styles/analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  // Dummy data for now
  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Orders",
        data: [65, 59, 80, 81, 56, 55, 90],
        fill: false,
        borderColor: "#2563eb",
        tension: 0.3
      }
    ]
  };

  const revenueData = {
    labels: ["Ethiopian", "Beverages", "Desserts", "Others"],
    datasets: [
      {
        data: [3000, 1500, 800, 500],
        backgroundColor: ["#f59e0b", "#10b981", "#ef4444", "#6366f1"]
      }
    ]
  };

  return (
    <div className="analytics-container">
      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <h4>Total Orders</h4>
          <p>432</p>
        </div>
        <div className="stat-card">
          <h4>Total Revenue</h4>
          <p>ETB 52,300</p>
        </div>
        <div className="stat-card">
          <h4>Top Dish</h4>
          <p>Traditional Injera Platter</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-box">
          <h4>Orders Over Time</h4>
          <Line data={ordersData} />
        </div>
        <div className="chart-box">
          <h4>Revenue Breakdown</h4>
          <Pie data={revenueData} />
        </div>
      </div>
    </div>
  );
}
