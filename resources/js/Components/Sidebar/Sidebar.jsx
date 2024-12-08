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
import RoomServiceIcon from '@mui/icons-material/RoomService';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ViewListIcon from '@mui/icons-material/ViewList';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
const Sidebar = ({ role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("Dashboard"); 

  const [isCollapsed, setIsCollapsed] = useState(false);

  const menus = {
    admin: [
      { title: "Dashboard", to: "admin.dashboard", icon: <DashboardIcon /> },
      { title: "Restaurantes", to: "admin.restaurant.index", icon: <RestaurantIcon /> },
      { title: "Categorías", to: "admin.categories.index", icon: <CategoryIcon /> },
      { title: "Clientes", to: "admin.customers.index", icon: <PeopleIcon /> },
      { title: "Repartidores", to: "admin.drivers.index", icon: <DeliveryDiningIcon /> },
      { title: "Reportes", to: "admin.reports.index", icon: <AssessmentIcon /> },
      { title: "Preguntas Frecuentes", to: "admin.faqs.index", icon: <QuestionAnswerIcon /> },
    ],
    restaurant: [
      { title: "Dashboard", to: "restaurante.dashboard", icon: <DashboardIcon /> },
      { title: "Menú", to: "restaurante.menu.index", icon: <MenuBookIcon /> },
      { title: "Productos", to: "restaurante.products.index", icon: <InventoryIcon /> },
      { title: "Ingredientes", to: "restaurante.ingredients.index", icon: <CategoryIcon /> },
      { title: "Categorías", to: "restaurante.categories.index", icon: <ViewListIcon /> },
      { title: "Ordenes", to: "restaurante.orders.index", icon: <RoomServiceIcon /> },
      { title: "Promociones", to: "restaurante.coupons.index", icon: <LocalOfferIcon /> },
    ],
    driver: [
      { title: "Dashboard", to: "driver.dashboard", icon: <DashboardIcon /> },
      { title: "Pedidos", to: "driver.orders.index", icon: <ReceiptLongIcon /> },
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