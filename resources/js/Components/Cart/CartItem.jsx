import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ name, description, price, quantity, onRemove }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        padding: "10px 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box>
        <Typography variant="body2" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "150px",
        }}
      >
        <Typography variant="body2">{quantity}</Typography>
        <Typography variant="body2">${price.toFixed(2)}</Typography>
        <IconButton
          onClick={onRemove}
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            "&:hover": {
              color: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;
