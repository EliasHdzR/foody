import React from "react";
import {Box, Typography, Button} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ProductsGrid = ({products, addToCart}) => {
    if(!products){
        return null;
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "20px",
            }}
        >
            {products.map((product, index) => (
                <Box
                    key={index}
                    sx={{
                        backgroundColor: "rgba(31, 29, 43, 1)",
                        borderRadius: "8px",
                        padding: "15px",
                        textAlign: "center",
                        color: "#fff",
                    }}
                >
                    <img
                        src={`/storage/${product.image_url}`}
                        alt={product.name}
                        style={{
                            width: "175px",
                            height: "175px",
                            margin: "0 auto 10px",
                            borderRadius: "8px",
                        }}
                    />
                    <Typography variant="body1" fontWeight="bold">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="rgba(234, 124, 105, 1)">
                        ${Number(product.price).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="#aaa">
                        {product.description}
                    </Typography>
                    <Box sx={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                        {[...Array(product.rating)].map((_, i) => (
                            <StarIcon key={i} sx={{color: "gold", fontSize: "16px"}}/>
                        ))}
                    </Box>
                    <Button
                        sx={{
                            backgroundColor: "rgba(234, 124, 105, 1)",
                            color: "#fff",
                            marginTop: "10px",
                            "&:hover": {
                                backgroundColor: "rgba(234, 124, 105, 0.9)",
                            },
                        }}
                        onClick={() => addToCart(product)}
                    >
                        +
                    </Button>
                </Box>
            ))}
        </Box>
    );
};

export default ProductsGrid;
