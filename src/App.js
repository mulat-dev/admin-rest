import React, { useState } from "react";
import LoginModal from "./Components/LoginModal";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import StatsCards from "./Components/StatsCards";
import Charts from "./Components/Charts";
import Orders from "./Components/Orders";
import RecentOrders from "./Components/RecentOrders";
import Menu from "./Components/Menu";
import Customers from "./Components/Custmores";
import Analytics from "./Components/Analytics";
import Deliverers from "./Components/Deliverers";
import Settings from "./Components/Settings";
import "./Styles/global.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const [deliverers, setDeliverers] = useState([
    {
      id: "D001",
      name: "Abel Tesfaye",
      phone: "+251 911 234 567",
      status: "Available",
      totalDeliveries: 120,
      complaints: [
        { id: "C001", orderId: "ORD023", reason: "Order never arrived", resolved: false }
      ]
    },
    {
      id: "D002",
      name: "Mulugeta Haile",
      phone: "+251 922 345 678",
      status: "Available",
      totalDeliveries: 85,
      complaints: []
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: {
        name: "Alem Tekle",
        phone: "+251 911 123 456",
        address: "Adi Haki, Mekelle",
      },
      items: [{ name: "Traditional Injera Platter", quantity: 2, price: 450 }],
      total: 900,
      status: "pending",
      assignedDelivererId: "D001",
      time: new Date(),
    },
    {
      id: "ORD002",
      customer: {
        name: "Berhe Gebre",
        phone: "+251 912 234 567",
        address: "Quiha, Mekelle",
      },
      items: [{ name: "Spiced Lamb Stew", quantity: 1, price: 380 }],
      total: 380,
      status: "confirmed",
      assignedDelivererId: "D002",
      time: new Date(),
    },
  ]);

  const [menuItems, setMenuItems] = useState([
    {
      id: "M001",
      name: "Traditional Injera Platter",
      description: "Served with assorted wot and fresh vegetables",
      category: "Ethiopian",
      price: 450,
      available: true,
    },
    {
      id: "M002",
      name: "Spiced Lamb Stew",
      description: "Tender lamb slow-cooked in berbere sauce",
      category: "Ethiopian",
      price: 380,
      available: false,
    },
  ]);

  const [customers, setCustomers] = useState([
    {
      id: "C001",
      name: "Alem Tekle",
      phone: "+251 911 123 456",
      address: "Adi Haki, Mekelle",
      ordersCount: 5,
      blocked: false
    },
    {
      id: "C002",
      name: "Berhe Gebre",
      phone: "+251 912 234 567",
      address: "Quiha, Mekelle",
      ordersCount: 2,
      blocked: true
    }
  ]);

  const pendingOrdersCount = orders.filter(o => o.status === "pending").length;
  const complaintsCount = deliverers.reduce(
    (count, d) => count + d.complaints.filter(c => !c.resolved).length,
    0
  );

  // ✅ Assign deliverer automatically
  const assignDeliverer = () => {
    const available = deliverers.filter(d => d.status === "Available");
    if (available.length === 0) return null;
    const chosen = available[Math.floor(Math.random() * available.length)];
    // Mark deliverer as busy
    setDeliverers(prev =>
      prev.map(d =>
        d.id === chosen.id ? { ...d, status: "Busy" } : d
      )
    );
    return chosen.id;
  };

  // ✅ Add new order with assigned deliverer
  const addOrder = (newOrder) => {
    const assignedId = assignDeliverer();
    setOrders(prev => [
      ...prev,
      {
        ...newOrder,
        assignedDelivererId: assignedId
      }
    ]);
    showNotification(`Order assigned to deliverer ${assignedId}`, "success");
  };

  // ✅ Notification
  const showNotification = (message, type) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginModal onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Sidebar
            setActiveSection={setActiveSection}
            complaintsCount={complaintsCount}
            pendingOrdersCount={pendingOrdersCount}
          />
          <div className="main-content">
            <Header activeSection={activeSection} />
            <div className="content-area">
              {activeSection === "overview" && (
                <>
                  <h2>Dashboard Overview</h2>
                  <StatsCards />
                  <Charts />
                  <RecentOrders orders={orders} />
                </>
              )}

              {activeSection === "orders" && (
                <Orders
                  orders={orders}
                  setOrders={setOrders}
                  deliverers={deliverers}
                  setDeliverers={setDeliverers}
                  showNotification={showNotification}
                />
              )}

              {activeSection === "menu" && (
                <Menu
                  menuItems={menuItems}
                  setMenuItems={setMenuItems}
                  showNotification={showNotification}
                />
              )}

              {activeSection === "customers" && (
                <Customers
                  customers={customers}
                  setCustomers={setCustomers}
                  showNotification={showNotification}
                />
              )}

              {activeSection === "analytics" && <Analytics />}

              {activeSection === "deliverers" && (
                <Deliverers
                  deliverers={deliverers}
                  setDeliverers={setDeliverers}
                  showNotification={showNotification}
                />
              )}

              {activeSection === "settings" && (
                <Settings showNotification={showNotification} />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
