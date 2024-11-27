import React from "react";
import { Box, Typography } from "@mui/material";

const Platillos = () => {
  const categorias = [
    { nombre: "Comida Mexicana", disponibles: 17 },
    { nombre: "Comida India", disponibles: 3 },
    { nombre: "Repostería", disponibles: 12 },
    { nombre: "Comida China", disponibles: 7 },
    { nombre: "Comida Veracruzana", disponibles: 10 },
  ];

  return (
    <Box>
      <Typography variant="h6" color="white" mb="16px">
        Categorías
      </Typography>
      <Box display="flex" flexDirection="column" gap="12px">
        {categorias.map((categoria, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "rgba(31, 29, 43, 1)",
              borderRadius: "8px",
              padding: "12px",
              textAlign: "center",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="body1"
              color="white"
              fontWeight="bold"
            >
              {categoria.nombre}
            </Typography>
            <Typography variant="caption" color="gray">
              {categoria.disponibles} Restaurantes Disponibles
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Platillos;
