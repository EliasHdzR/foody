import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "@/theme"; 
import SidebarItem from "./SidebarItem";

import DashboardIcon from "@mui/icons-material/Dashboard";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AssessmentIcon from "@mui/icons-material/Assessment";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Sidebar = ({ role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("");

  const [isCollapsed, setIsCollapsed] = useState(false);

  const menus = {
    admin: [
      { title: "Dashboard", to: "/admin/dashboard", icon: <DashboardIcon /> },
      { title: "Restaurantes", to: "/admin/restaurantes", icon: <RestaurantIcon /> },
      { title: "Categorías", to: "/admin/categorias", icon: <CategoryIcon /> },
      { title: "Clientes", to: "/admin/clientes", icon: <PeopleIcon /> },
      { title: "Repartidores", to: "/admin/repartidores", icon: <DeliveryDiningIcon /> },
      { title: "Reportes", to: "/admin/reportes", icon: <AssessmentIcon /> },
      { title: "Inventario", to: "/admin/inventario", icon: <InventoryIcon /> },
      { title: "Promociones", to: "/admin/promociones", icon: <LocalOfferIcon /> },
    ],
    restaurant: [
      { title: "Dashboard", to: "/restaurante/dashboard", icon: <DashboardIcon /> },
      { title: "Menú", to: "/restaurante/menu", icon: <MenuBookIcon /> },
      { title: "Productos", to: "/restaurante/productos", icon: <InventoryIcon /> },
      { title: "Ingredientes", to: "/restaurante/ingredientes", icon: <CategoryIcon /> },
    ],
    driver: [
      { title: "Dashboard", to: "/repartidor/dashboard", icon: <DashboardIcon /> },
      { title: "Pedidos Activos", to: "/repartidor/pedidos", icon: <ReceiptLongIcon /> },
      { title: "Mi Perfil", to: "/repartidor/perfil", icon: <PersonOutlineIcon /> },
    ],
  };

  const menuItems = menus[role] || []; 

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
        width: isCollapsed ? "80px" : "250px",
        height: "100vh",
        backgroundColor: colors.primary[400],
        color: colors.grey[100],
        display: "flex",
        flexDirection: "column",
        padding: "10px 0",
        boxShadow: theme.shadows[4],
        transition: "width 0.3s ease",
      }}
    >
      <Box
        display="flex"
        justifyContent={isCollapsed ? "center" : "space-between"}
        alignItems="center"
        p="10px 20px"
      >
        {!isCollapsed && (
          <Typography
            variant="h5"
            fontWeight="bold"
            color={colors.greenAccent[600]}
          >
            {role === "admin" ? "Admin Panel" : role === "restaurant" ? "Restaurante" : "Repartidor"}
          </Typography>
        )}
        <IconButton
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{ color: colors.grey[100] }}
        >
          <MenuOutlinedIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          marginTop: "20px",
          padding: "5px 10px",
          flex: 1,
        }}
      >
        {menuItems.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            to={item.to}
            icon={item.icon}
            selected={selected}
            setSelected={setSelected}
            isCollapsed={isCollapsed}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
