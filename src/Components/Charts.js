import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../Styles/charts.css";

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

export default function Charts() {
  const salesData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales (ETB)",
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        borderColor: "#DAA520",
        backgroundColor: "rgba(218, 165, 32, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const popularItemsData = {
    labels: ["Injera Platter", "Lamb Stew", "Vegetarian Combo", "Coffee"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#DAA520", "#8B4513", "#CD853F", "#D2691E"],
      },
    ],
  };

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Sales Overview</h3>
        <Line data={salesData} />
      </div>
      <div className="chart-card">
        <h3>Popular Items</h3>
        <Doughnut data={popularItemsData} />
      </div>
    </div>
  );
}
