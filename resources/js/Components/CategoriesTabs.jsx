import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import ProductsGrid from "./ProductsGrid";

const categories = [
  { label: "Plato Principal", value: "main" },
  { label: "Entrada", value: "entrada" },
  { label: "Complementos", value: "complementos" },
  { label: "Bebidas", value: "bebidas" },
  { label: "Postres", value: "postres" },
];

const mockProducts = {
  main: Array(8).fill({
    name: "Otra Pizza Simple",
    price: 99.0,
    description: "Disponible",
    rating: 4,
    image: "https://via.placeholder.com/150",
  }),
  entrada: Array(5).fill({
    name: "Entrada Clásica",
    price: 49.0,
    description: "Disponible",
    rating: 3,
    image: "https://via.placeholder.com/150",
  }),
  complementos: Array(6).fill({
    name: "Complemento Básico",
    price: 29.0,
    description: "Disponible",
    rating: 5,
    image: "https://via.placeholder.com/150",
  }),
  bebidas: Array(4).fill({
    name: "Bebida Refrescante",
    price: 19.0,
    description: "Disponible",
    rating: 4,
    image: "https://via.placeholder.com/150",
  }),
  postres: Array(3).fill({
    name: "Postre Dulce",
    price: 59.0,
    description: "Disponible",
    rating: 5,
    image: "https://via.placeholder.com/150",
  }),
};

const CategoriesTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState("main");

  const handleTabChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedCategory}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
        sx={{
          "& .MuiTab-root": {
            color: "#fff",
            fontWeight: "bold",
          },
          "& .Mui-selected": {
            color: "rgba(234, 124, 105, 1)", 
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "rgba(234, 124, 105, 1)", 
          },
        }}
      >
        {categories.map((category) => (
          <Tab key={category.value} label={category.label} value={category.value} />
        ))}
      </Tabs>

      <ProductsGrid products={mockProducts[selectedCategory]} />
    </Box>
  );
};

export default CategoriesTabs;
