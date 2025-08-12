import React from "react";
import "../Styles/recentOrders.css";

export default function RecentOrders() {
  const orders = [
    {
      id: "ORD001",
      customer: { name: "Alem Tekle", phone: "+251 911 123 456" },
      items: 2,
      total: 900,
      status: "pending",
      time: "30 minutes ago",
    },
    {
      id: "ORD002",
      customer: { name: "Berhe Gebre", phone: "+251 912 234 567" },
      items: 1,
      total: 380,
      status: "confirmed",
      time: "45 minutes ago",
    },
    {
      id: "ORD003",
      customer: { name: "Hiwot Meles", phone: "+251 913 345 678" },
      items: 1,
      total: 280,
      status: "preparing",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="recent-orders">
      <div className="table-header">
        <h3>Recent Orders</h3>
      </div>
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Details</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <div className="customer-name">{order.customer.name}</div>
                  <div className="customer-phone">{order.customer.phone}</div>
                </td>
                <td>{order.items} items</td>
                <td>{order.total} ETB</td>
                <td>
                  <span className={`status-badge ${order.status}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td>{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
