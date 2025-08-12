import React, { useState } from "react";
import "../Styles/menu.css";

export default function Menu({ menuItems = [], setMenuItems, showNotification }) {
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    price: "",
    available: true
  });

  const toggleAvailability = (itemId) => {
    setMenuItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
    showNotification(`Item ${itemId} availability changed.`, "success");
  };

  const editItem = (itemId) => {
    const item = menuItems.find(i => i.id === itemId);
    if (item) {
      const updatedName = prompt("Edit item name:", item.name);
      if (updatedName) {
        setMenuItems(prev =>
          prev.map(i => (i.id === itemId ? { ...i, name: updatedName } : i))
        );
        showNotification(`Item ${itemId} updated.`, "success");
      }
    }
  };

  const addItem = () => {
    if (!newItem.id || !newItem.name || !newItem.price) {
      alert("Please fill in at least ID, Name, and Price");
      return;
    }
    setMenuItems(prev => [...prev, { ...newItem, price: Number(newItem.price) }]);
    setNewItem({
      id: "",
      name: "",
      description: "",
      category: "",
      price: "",
      available: true
    });
    setShowForm(false);
    showNotification(`New item ${newItem.name} added.`, "success");
  };

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h3>Menu Management</h3>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add New Item</button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Menu Item</h3>
            <input type="text" placeholder="ID" value={newItem.id} onChange={e => setNewItem({ ...newItem, id: e.target.value })} />
            <input type="text" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
            <textarea placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })}></textarea>
            <input type="text" placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
            <input type="number" placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
            <div className="modal-actions">
              <button onClick={addItem}>Save</button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="menu-grid">
        {menuItems.length > 0 ? (
          menuItems.map(item => (
            <div key={item.id} className="menu-card">
              <div className="menu-card-header">
                <h4>{item.name}</h4>
                <span className={`status-badge ${item.available ? "available" : "unavailable"}`}>
                  {item.available ? "Available" : "Unavailable"}
                </span>
              </div>
              <p className="menu-desc">{item.description}</p>
              <p className="menu-price">{item.price} ETB</p>
              <p className="menu-category">{item.category}</p>
              <div className="menu-actions">
                <button className="edit-btn" onClick={() => editItem(item.id)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className={`toggle-btn ${item.available ? "disable" : "enable"}`}
                  onClick={() => toggleAvailability(item.id)}
                >
                  {item.available ? "Disable" : "Enable"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state">No menu items found.</p>
        )}
      </div>
    </div>
  );
}
