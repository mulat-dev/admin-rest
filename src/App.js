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
import Settings from "./Components/Settings";
import "./Styles/global.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Orders state
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
      time: new Date(),
    },
  ]);

  // Menu state
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


  // Notification helper
  const showNotification = (message, type) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <LoginModal onLogin={() => setIsLoggedIn(true)} />
      ) : (
        <>
          <Sidebar setActiveSection={setActiveSection} />
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
                <>
                  <h2>Order Management</h2>
                  <Orders
                    orders={orders}
                    setOrders={setOrders}
                    showNotification={showNotification}
                  />
                </>
              )}

              {activeSection === "menu" && (
                <>
                  <Menu
                    menuItems={menuItems}
                    setMenuItems={setMenuItems}
                    showNotification={showNotification}
                  />
                </>
              )}

              {activeSection === "customers" && (
                <Customers
                  customers={customers}
                  setCustomers={setCustomers}
                  showNotification={showNotification}
                />
              )}
              {activeSection === "analytics" && <Analytics />}
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
