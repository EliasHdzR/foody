import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import "./layout.css"; // Estilos globales del layout

const Layout = ({ children, type }) => {
  return (
    <div className="app">
      <div className="sidebar-container">
        <Sidebar role={type} />
      </div>

      <div className="layout-container">
        <Navbar role={type} />

        <div className="content-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
