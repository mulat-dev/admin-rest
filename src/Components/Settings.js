import React, { useState } from "react";
import "../Styles/settings.css";

export default function Settings({ showNotification }) {
  const [restaurant, setRestaurant] = useState({
    name: "ምግብ ቤት",
    phone: "+251 914 123 456",
    address: "Mekelle, Tigray, Ethiopia",
  });

  const [operational, setOperational] = useState({
    acceptOrders: true,
    deliveryRadius: 10,
    minimumOrder: 150,
  });

  const saveRestaurantInfo = () => {
    showNotification("Restaurant settings saved successfully", "success");
  };

  const saveOperationalInfo = () => {
    showNotification("Operational settings saved successfully", "success");
  };

  return (
    <div className="settings-wrapper">
      {/* Restaurant Settings */}
      <div className="settings-card">
        <h3>Restaurant Settings</h3>
        <label>Restaurant Name</label>
        <input
          type="text"
          value={restaurant.name}
          onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
        />
        <label>Phone Number</label>
        <input
          type="text"
          value={restaurant.phone}
          onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
        />
        <label>Address</label>
        <textarea
          value={restaurant.address}
          onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
        ></textarea>
        <button className="save-btn" onClick={saveRestaurantInfo}>
          Save Changes
        </button>
      </div>

      {/* Operational Settings */}
      <div className="settings-card">
        <h3>Operational Settings</h3>
        <div className="toggle-row">
          <span>Accept New Orders</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={operational.acceptOrders}
              onChange={() =>
                setOperational((prev) => ({
                  ...prev,
                  acceptOrders: !prev.acceptOrders,
                }))
              }
            />
            <span className="slider round"></span>
          </label>
        </div>
        <label>Delivery Radius (km)</label>
        <input
          type="number"
          value={operational.deliveryRadius}
          onChange={(e) =>
            setOperational({ ...operational, deliveryRadius: e.target.value })
          }
        />
        <label>Minimum Order (ETB)</label>
        <input
          type="number"
          value={operational.minimumOrder}
          onChange={(e) =>
            setOperational({ ...operational, minimumOrder: e.target.value })
          }
        />
        <button className="save-btn" onClick={saveOperationalInfo}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
