import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import CompactSidebar from "@/Components/CompactSidebar"; 
import "./layout.css"; 

const Layout = ({ children, type }) => {
  return (
    <div className="app">
      <div className="sidebar-container">
        {type === "customer" ? (
          <CompactSidebar /> 
        ) : (
          <Sidebar role={type} /> 
        )}
      </div>

      {type !== "customer" && (
        <div className="layout-container">
          <Navbar role={type} /> 
          <div className="content-container">{children}</div>
        </div>
      )}

      {type === "customer" && <div className="content-container">{children}</div>}
    </div>
  );
};

export default Layout;
