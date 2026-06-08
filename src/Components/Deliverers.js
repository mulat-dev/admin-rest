import React, { useState } from "react";
import "../Styles/deliverers.css"
export default function Deliverers({ deliverers = [], setDeliverers, showNotification }) {
  const [search, setSearch] = useState("");
  const [selectedDeliverer, setSelectedDeliverer] = useState(null);

  // ✅ Highlight deliverers with unresolved complaints
  const hasUnresolvedComplaints = (deliverer) =>
    deliverer.complaints.some(c => !c.resolved);

  // ✅ Resolve a complaint
  const resolveComplaint = (delivererId, complaintId) => {
    setDeliverers(prev =>
      prev.map(d =>
        d.id === delivererId
          ? {
              ...d,
              complaints: d.complaints.map(c =>
                c.id === complaintId ? { ...c, resolved: true } : c
              )
            }
          : d
      )
    );
    showNotification(`Complaint ${complaintId} resolved`, "success");
  };

  // ✅ Filter by search
  const filteredDeliverers = deliverers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="deliverers-container">
      <div className="deliverers-header">
        <h3>Deliverers Management</h3>
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-wrapper">
        <table className="deliverers-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Total Deliveries</th>
              <th>Complaints</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliverers.length > 0 ? (
              filteredDeliverers.map(d => (
                <tr key={d.id} className={hasUnresolvedComplaints(d) ? "urgent-order" : ""}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.phone}</td>
                  <td>{d.status}</td>
                  <td>{d.totalDeliveries}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedDeliverer(d)}
                      disabled={d.complaints.length === 0}
                      title={d.complaints.length === 0 ? "No complaints" : "View complaints"}
                    >
                      <i className="fas fa-eye" style={{ opacity: d.complaints.length === 0 ? 0.3 : 1 }}></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-state">
                  No deliverers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Complaints Modal */}
      {selectedDeliverer && (
        <div className="modal-overlay" onClick={() => setSelectedDeliverer(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h4>Complaints for {selectedDeliverer.name}</h4>
            {selectedDeliverer.complaints.length > 0 ? (
              selectedDeliverer.complaints.map(c => (
                <div key={c.id} className={`complaint ${c.resolved ? "resolved" : "unresolved"}`}>
                  <p><strong>Order ID:</strong> {c.orderId}</p>
                  <p><strong>Reason:</strong> {c.reason}</p>
                  <p><strong>Status:</strong> {c.resolved ? "Resolved" : "Unresolved"}</p>
                  {!c.resolved && (
                    <button
                      onClick={() => resolveComplaint(selectedDeliverer.id, c.id)}
                      className="resolve-btn"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No complaints found.</p>
            )}
            <button onClick={() => setSelectedDeliverer(null)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
