import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaClipboardList
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Add Professor", path: "/professors", icon: <FaUserPlus /> },
    { name: "View Professor", path: "/professor-list", icon: <FaUsers /> },
    { name: "Assign Paper", path: "/assign-paper", icon: <FaClipboardList /> }
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <h2 style={{ color: "#2563eb" }}>ExamatrixLive</h2>
      </div>

      {menus.map((menu, index) => {
        const isActive = location.pathname === menu.path;

        return (
          <Link
            key={index}
            to={menu.path}
            style={{
              ...styles.menuItem,
              ...(isActive ? styles.activeMenu : {})
            }}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    background: "#ffffff",
    minHeight: "100vh",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    borderRight: "1px solid #e5e7eb",
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)"
  },

  logo: {
    textAlign: "center",
    marginBottom: "40px",
    fontWeight: "700"
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#374151",
    textDecoration: "none",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "12px",
    transition: "0.3s",
    fontWeight: "500"
  },

  activeMenu: {
    background: "#2563eb",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(37,99,235,0.3)"
  }
};