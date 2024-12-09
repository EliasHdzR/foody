import React from "react";
import { Box, Typography, Button } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ProductsGrid = ({products, addToCart}) => {
    if(!products){
        return null;
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "15px",
                marginTop: "20px",
                overflow:"auto"
            }}
        >
            {products.map((product, index) => (
                <Box
                    key={index}
                    sx={{
                        position: "relative",
                        backgroundColor: "rgba(31, 29, 43, 1)",
                        borderRadius: "12px",
                        padding: "15px",
                        textAlign: "center",
                        color: "#fff",
                        height: "400px",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            backgroundColor: "#fff",
                        }}
                    >
                        <img
                            src={`/storage/${product.image_url}`}
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    <Box sx={{ marginTop: "160px" }}>
                        <Typography variant="body1" fontWeight="bold" sx={{ fontSize: "18px" }}>
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="rgba(234, 124, 105, 1)" sx={{ fontSize: "16px" }}>
                            ${Number(product.price).toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="#aaa" sx={{ fontSize: "14px", marginTop: "10px" }}>
                            {product.description || "Disponible"}
                        </Typography>
                    </Box>

                    <Button
                        sx={{
                            backgroundColor: "rgba(234, 124, 105, 1)",
                            color: "#fff",
                            marginTop: "20px",
                            padding: "8px 20px",
                            position: "absolute",
                            bottom: "15px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "80%",
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
