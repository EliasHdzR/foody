import React from "react";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import CompactSidebar from "@/Components/CompactSidebar";

const Layout = ({ children, type }) => {
  return (
    <div className="flex flex-row h-screen w-full">
      <div className=" flex-shrink-0 h-full bg-sidebar-bg text-white">
        {type === "customer" ? <CompactSidebar /> : <Sidebar role={type} />}
      </div>

      {type !== "customer" && (
        <div className="layout-container flex flex-col flex-1 h-full overflow-hidden">
          <Navbar role={type} />
          <div className="content-container flex-1 overflow-y-auto p-0 m-0">
            {children}
          </div>
        </div>
      )}

      {type === "customer" && (
        <div className="content-container flex-1 overflow-y-auto p-0 m-0">
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;
