import React, {useState} from "react";
import {Box, Tabs, Tab} from "@mui/material";
import ProductsGrid from "./ProductsGrid";

const CategoriesTabs = ({products, categories, addToCart}) => {
    const categorizedProducts = categories.reduce((acc, category) => {
        acc[category.id] = products.filter(product => product.category.id === category.id) || [];
        return acc;
    }, {});

    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

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
                    <Tab key={category.id} label={category.name} value={category.id}/>
                ))}
            </Tabs>

            <ProductsGrid products={categorizedProducts[selectedCategory]} addToCart={addToCart}/>
        </Box>
    );
};

export default CategoriesTabs;
