import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "@/theme"; // Ajusta la ruta si es necesario
import { Link } from "@inertiajs/react"; // Importa el Link de Inertia.js

const SidebarItem = ({ title, to, icon, selected, setSelected, isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Link
      href={route(`${to}`)} // Utiliza href para las rutas en Inertia.js
      onClick={() => setSelected(title)}
      style={{
        textDecoration: "none", // Elimina el subrayado de los enlaces
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: isCollapsed ? "10px 15px" : "10px 20px",
          color: selected === title ? colors.blueAccent[300] : colors.grey[100],
          backgroundColor: selected === title ? colors.primary[800] : "transparent",
          borderRadius: "8px",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: colors.primary[900],
          },
        }}
      >
        {/* Icono */}
        {icon && (
          <Box
            sx={{
              marginRight: isCollapsed ? 0 : "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        )}
        {/* Título */}
        {!isCollapsed && (
          <Typography
            variant="body1"
            ml="10px"
            fontWeight="500"
            color="inherit"
          >
            {title}
          </Typography>
        )}
      </Box>
    </Link>
  );
};

export default SidebarItem;
