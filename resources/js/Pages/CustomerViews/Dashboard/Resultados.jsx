import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "@inertiajs/react";

const Resultados = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [platillos, setPlatillos] = useState([]);

  useEffect(() => {
    fetch('/cliente/restaurants')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setRestaurants(data.restaurants);
        const allPlatillos = data.restaurants.flatMap((r) => r.products);
        setPlatillos(allPlatillos);
      })
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  return (
    <Box>
      <Box>
        <Typography variant="h6" color="white" mb="16px">
          Restaurantes
        </Typography>
        <Box display="flex" gap="16px" flexWrap="wrap">
          {restaurants.map((restaurante, index) => (
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
              <Link href={`/cliente/restaurant/${restaurante.id}`}>
                <Typography variant="body1" color="white" fontWeight="bold">
                  {restaurante.name}
                </Typography>
              </Link>
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
            <Link key={index} href={`/cliente/product/${platillo.id}`}>
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
                  {platillo.name}
                </Typography>
              <Typography variant="body2" color="gray">
                {platillo.price}
              </Typography>
              <Typography variant="caption" color="yellow">
                {"⭐".repeat(platillo.rating || 0)}
              </Typography>
            </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Resultados;
