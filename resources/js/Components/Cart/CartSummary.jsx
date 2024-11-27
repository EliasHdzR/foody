import { Box, Typography, Button } from "@mui/material";

const CartSummary = ({ subtotal, shipping, tax, total, onCheckout }) => {
  return (
    <Box sx={{ marginTop: "20px", color: "#fff" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
        }}
      >
        <Typography variant="body2">Subtotal</Typography>
        <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
        }}
      >
        <Typography variant="body2">Costo de Envío</Typography>
        <Typography variant="body2">${shipping.toFixed(2)}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
        }}
      >
        <Typography variant="body2">IVA</Typography>
        <Typography variant="body2">${tax.toFixed(2)}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 0",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          marginTop: "10px",
        }}
      >
        <Typography variant="body1" fontWeight="bold">
          Total
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          ${total.toFixed(2)}
        </Typography>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Button
          variant="contained"
          fullWidth
          onClick={onCheckout} 
          sx={{
            backgroundColor: "rgba(234, 124, 105, 1)",
            color: "#fff",
            "&:hover": { backgroundColor: "rgba(234, 124, 105, 0.9)" },
          }}
        >
          Continuar al Pago
        </Button>
      </Box>
    </Box>
  );
};

export default CartSummary;
