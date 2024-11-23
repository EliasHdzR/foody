import { Box, Typography, useTheme } from "@mui/material";

const TopSelling = () => {
  const theme = useTheme();

  const items = [
    { name: "Tata Salt", store: "Carl's Jr", image: "/path-to-tata-salt.png" },
    { name: "Lays", store: "Soriana", image: "/path-to-lays.png" },
    { name: "Lays", store: "Walmart", image: "/path-to-lays.png" },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      bgcolor="background.default"
      borderRadius="8px"
      p="15px" // Ajuste de padding general
      sx={{
        boxShadow: theme.shadows[1],
        overflow: "hidden",
      }}
    >
      {/* Encabezado */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="10px">
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Más vendidos
        </Typography>
        <Typography
          variant="button"
          color="secondary.main"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Todos
        </Typography>
      </Box>

      {/* Lista de productos */}
      <Box
        sx={{
          overflowY: "auto",
          maxHeight: "calc(100% - 50px)",
        }}
      >
        {items.map((item, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            mb="5px" // Espacio más compacto entre filas
            p="5px" // Reducción del padding interno de las filas
            borderRadius="6px" // Bordes más pequeños
            bgcolor={
              index % 2 === 0
                ? theme.palette.background.paper
                : theme.palette.action.hover
            }
            sx={{
              "&:hover": { bgcolor: theme.palette.action.selected },
            }}
          >
            {/* Imagen del producto */}
            <Box
              component="img"
              src={item.image}
              alt={item.name}
              sx={{
                width: "40px", // Reducción de tamaño de la imagen
                height: "40px", // Reducción de tamaño de la imagen
                borderRadius: "4px", // Bordes más pequeños en las imágenes
                objectFit: "cover",
                mr: "8px", // Menor separación horizontal
              }}
            />
            {/* Detalles del producto */}
            <Box>
              <Typography
                variant="body2" // Fuente más pequeña
                fontWeight="500" // Peso más ligero
                color="text.primary"
              >
                {item.name}
              </Typography>
              <Typography
                variant="caption" // Fuente aún más pequeña
                color="text.secondary"
              >
                {item.store}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TopSelling;
