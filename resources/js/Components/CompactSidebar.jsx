import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "@/theme"; 
import CompactItem from "./CompactItem";

import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const CompactSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selected, setSelected] = useState("");

  const menuItems = [
    { title: "Dashboard", to: "/cliente/dashboard", icon: <HomeIcon /> },
    { title: "Tiendas", to: "/cliente/tiendas", icon: <StoreIcon /> },
    { title: "Configuración", to: "/settings", icon: <SettingsIcon /> },
    { title: "Logout", to: "/logout", icon: <ExitToAppIcon /> },
  ];

  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeItem = menuItems.find((item) => item.to === currentPath);
    if (activeItem) {
      setSelected(activeItem.title);
    }
  }, [menuItems]);

  return (
    <Box
      sx={{
        width: "80px",
        height: "100vh",
        backgroundColor: "rgba(31, 29, 43, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 0",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      {menuItems.map((item) => (
        <CompactItem
          key={item.title}
          title={item.title}
          to={item.to}
          icon={item.icon}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </Box>
  );
};

export default CompactSidebar;
