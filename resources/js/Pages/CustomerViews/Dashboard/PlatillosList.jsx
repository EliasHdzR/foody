import React from "react";
import { Box, Typography } from "@mui/material";

const PlatillosList = ({ platillos }) => {
  return (
    <Box display="flex" flexDirection="column" gap="12px">
      {platillos.map((platillo, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(31, 29, 43, 1)",
            borderRadius: "8px",
            padding: "12px",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={platillo.image_url || "https://via.placeholder.com/80"}
            alt={platillo.name}
            style={{ width: "80px", height: "80px", marginRight: "16px" }}
          />
          <Box>
            <Typography variant="body1" color="white" fontWeight="bold">
              {platillo.name}
            </Typography>
            <Typography variant="caption" color="gray">
              {platillo.description || "Descripción no disponible"}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default PlatillosList;
