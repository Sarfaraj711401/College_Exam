import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserPlus,
  FaUsers,
  FaClipboardList,
  FaSignOutAlt
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />
    },
    {
      name: "Add Professor",
      path: "/professors",
      icon: <FaUserPlus />
    },
    {
      name: "View Professor",
      path: "/professor-list",
      icon: <FaUsers />
    },
    {
      name: "Assign Paper",
      path: "/assign-paper",
      icon: <FaClipboardList />
    }
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <h2>Exam ERP</h2>
      </div>

      {menus.map((menu, index) => (
        <Link
          key={index}
          to={menu.path}
          style={{
            ...styles.menuItem,
            background:
              location.pathname === menu.path
                ? "#2563eb"
                : "transparent"
          }}
        >
          {menu.icon}
          <span>{menu.name}</span>
        </Link>
      ))}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0
  },

  logo: {
    textAlign: "center",
    marginBottom: "40px"
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "white",
    textDecoration: "none",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "12px"
  },

  logout: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "white",
    textDecoration: "none",
    padding: "14px",
    borderRadius: "10px",
    marginTop: "40px",
    background: "#ef4444"
  }
};