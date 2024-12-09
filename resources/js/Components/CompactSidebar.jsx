import React, { useState, useEffect } from "react";
import CompactItem from "./CompactItem";

import Home from "../../svg/Home.jsx";
import Store from "../../svg/Store.jsx";
import Order from "../../svg/Order.jsx";
import Settings from "../../svg/Settings.jsx";
import IconCustom from "../../svg/IconCustom.jsx";
import LogOut from "../../svg/LogOut.jsx";

const CompactSidebar = () => {
  const [selected, setSelected] = useState("");

  const menuItems = [
    { title: "Dashboard", to: "cliente.dashboard", icon: Home, method: "GET" },
    { title: "Orders", to: "cliente.orders.index", icon: Order },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeItem = menuItems.find((item) => route(`${item.to}`) === currentPath);
    if (activeItem) {
      setSelected(activeItem.title);
    }
  }, []);

  return (
    <div className="w-[120px] h-screen bg-[rgba(0,0,0,.9)] flex flex-col justify-between items-center py-8">
      <div className="w-full h-16 flex items-center justify-center rounded-lg">
        <IconCustom />
      </div>

      <div className="flex flex-col w-full space-y-5">
        {menuItems.map((item) => (
          <CompactItem
            key={item.title}
            title={item.title}
            to={item.to}
            method={item.method}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>

      <div className="flex flex-col w-full mb-5 space-y-5">
        <CompactItem
          title="Configuración"
          to="profile.edit"
          method="GET"
          icon={Settings}
          selected={selected}
          setSelected={setSelected}
        />
        <CompactItem
          title="Logout"
          to="logout"
          method="POST"
          icon={LogOut}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default CompactSidebar;
