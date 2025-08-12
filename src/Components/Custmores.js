import React, { useState } from "react";
import "../Styles/customers.css";

export default function Customers({ customers = [], setCustomers, showNotification }) {
  const [filter, setFilter] = useState("all");

  const toggleBlock = (customerId) => {
    setCustomers(prev =>
      prev.map(c =>
        c.id === customerId ? { ...c, blocked: !c.blocked } : c
      )
    );
    showNotification(
      `Customer ${customerId} ${customers.find(c => c.id === customerId).blocked ? "unblocked" : "blocked"}`,
      "success"
    );
  };

  const filteredCustomers =
    filter === "all"
      ? customers
      : filter === "blocked"
      ? customers.filter(c => c.blocked)
      : customers.filter(c => !c.blocked);

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h3>Customer Management</h3>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="customers-filter"
        >
          <option value="all">All Customers</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="customers-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(c => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.address}</td>
                  <td>{c.ordersCount}</td>
                  <td>
                    <span className={`status-badge ${c.blocked ? "blocked" : "active"}`}>
                      {c.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="view-btn" onClick={() => alert(`Viewing ${c.name}`)}>
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className={`block-btn ${c.blocked ? "unblock" : "block"}`}
                        onClick={() => toggleBlock(c.id)}
                      >
                        {c.blocked ? "Unblock" : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
