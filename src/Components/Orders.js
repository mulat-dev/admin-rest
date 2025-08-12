import React, { useState } from "react";
import "../Styles/table.css";

export default function Orders({ orders = [], setOrders, showNotification }) {
  const [filter, setFilter] = useState("all");

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    showNotification(`Order ${orderId} status updated to ${newStatus}`, "success");
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter(order => order.status === filter);

  const viewOrder = orderId => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      alert(
        `Order Details:\n\nID: ${order.id}\nCustomer: ${order.customer.name}\nPhone: ${order.customer.phone}\nTotal: ${order.total} ETB\nStatus: ${order.status}`
      );
    }
  };

  const printOrder = orderId => {
    showNotification(`Printing order ${orderId}...`, "success");
  };

  return (
    <div className="orders-container">
      {/* Header Row */}
      <div className="orders-header">
      <h3>Order Management</h3>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="status-select"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>
                    <div className="order-id">{order.id}</div>
                    <div className="order-time">
                      {order.time.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div className="customer-name">{order.customer.name}</div>
                    <div className="customer-phone">
                      {order.customer.phone}
                    </div>
                    <div className="customer-address">
                      {order.customer.address}
                    </div>
                  </td>
                  <td>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="item">
                        {item.name} x{item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="order-total">{order.total} ETB</td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <div className="actions">
                      <button
                        onClick={() => viewOrder(order.id)}
                        className="view-btn"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        onClick={() => printOrder(order.id)}
                        className="print-btn"
                      >
                        <i className="fas fa-print"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
