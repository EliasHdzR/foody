import { Box, Typography } from "@mui/material";

const Tiendas = () => {
  const tiendas = [
    {
      nombre: "Pizza Hut",
      categoria: "Comida Americana",
      articulos: "20 Artículos Disponibles",
      logo: "path/to/pizza-hut-logo.png",
    },
    {
      nombre: "Little Caesars",
      categoria: "Comida Americana",
      articulos: "10 Artículos Disponibles",
      logo: "path/to/little-caesars-logo.png",
    },
  ];

  return (
    <Box display="flex" gap="16px">
      {tiendas.map((tienda, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "rgba(31, 29, 43, 1)",
            borderRadius: "8px",
            padding: "12px",
            textAlign: "center",
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
            flex: "1",
          }}
        >
          <img
            src={tienda.logo}
            alt={tienda.nombre}
            style={{ width: "100px", margin: "0 auto" }}
          />
          <Typography
            variant="body1"
            color="white"
            fontWeight="bold"
            mt="10px"
          >
            {tienda.nombre}
          </Typography>
          <Typography variant="body2" color="gray">
            {tienda.categoria}
          </Typography>
          <Typography variant="caption" color="gray">
            {tienda.articulos}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Tiendas;
