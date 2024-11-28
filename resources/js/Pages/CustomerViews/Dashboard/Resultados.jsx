import React from "react";
import { Box, Typography } from "@mui/material";

const Resultados = () => {
  const restaurantes = [
    { nombre: "Pizza Hut", categoria: "Comida Americana", articulos: 20 },
    { nombre: "Little Caesars", categoria: "Comida Americana", articulos: 10 },
  ];

  const platillos = [
    { nombre: "Huevo Estrellado", precio: "$79.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Caldo de Camarón", precio: "$120.00", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 4 },

  ];

  return (
    <Box>
      <Box>
        <Typography variant="h6" color="white" mb="16px">
          Restaurantes
        </Typography>
        <Box display="flex" gap="16px">
          {restaurantes.map((restaurante, index) => (
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
              <Typography variant="body1" color="white" fontWeight="bold">
                {restaurante.nombre}
              </Typography>
              <Typography variant="body2" color="gray">
                {restaurante.categoria}
              </Typography>
              <Typography variant="caption" color="gray">
                {restaurante.articulos} Artículos Disponibles
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Box mt="24px">
        <Typography variant="h6" color="white" mb="16px">
          Platillos
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {platillos.map((platillo, index) => (
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
              <Typography variant="body1" color="white" fontWeight="bold">
                {platillo.nombre}
              </Typography>
              <Typography variant="body2" color="gray">
                {platillo.precio}
              </Typography>
              <Typography variant="caption" color="gray">
                {platillo.disponible}
              </Typography>
              <Typography variant="caption" color="yellow">
                {"⭐".repeat(platillo.calificacion)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Resultados;
