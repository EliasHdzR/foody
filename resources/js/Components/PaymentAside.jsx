import { useState } from "react";
import { Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";

const PaymentAside = ({ onCancel, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta");
  const [paymentDetails, setPaymentDetails] = useState({
    ownerName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handlePaymentMethodChange = (event, newMethod) => {
    if (newMethod !== null) {
      setPaymentMethod(newMethod);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "100vh", 
        position: "sticky", 
        top: 0, 
        overflowY: "auto", 
        backgroundColor: "rgba(31, 29, 43, 1)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "rgba(234, 124, 105, 1)",
        }}
      >
        Pago
      </Typography>

      <Box>
        <Typography
          variant="body1"
          sx={{ marginBottom: "10px", fontWeight: "bold", color: "#fff" }}
        >
          3 Métodos de Pago Disponibles
        </Typography>
        <ToggleButtonGroup
          value={paymentMethod}
          exclusive
          onChange={handlePaymentMethodChange}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          {["Tarjeta", "Paypal", "Efectivo"].map((method) => (
            <ToggleButton
              key={method}
              value={method}
              sx={{
                flex: 1,
                backgroundColor:
                  paymentMethod === method
                    ? "rgba(234, 124, 105, 0.9)"
                    : "rgba(31, 29, 43, 1)",
                color: "#fff",
                fontWeight: "bold",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  backgroundColor: "rgba(234, 124, 105, 1)",
                },
              }}
            >
              {method}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Box>
          <TextField
            label="Nombre del Propietario"
            variant="outlined"
            fullWidth
            name="ownerName"
            value={paymentDetails.ownerName}
            onChange={handleInputChange}
            sx={{
              marginBottom: "15px",
              backgroundColor: "rgba(45, 43, 56, 1)",
              borderRadius: "5px",
              input: { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          />
          <TextField
            label="Número de Tarjeta"
            variant="outlined"
            fullWidth
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            sx={{
              marginBottom: "15px",
              backgroundColor: "rgba(45, 43, 56, 1)",
              borderRadius: "5px",
              input: { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#fff" },
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          />
          <Box sx={{ display: "flex", gap: "15px" }}>
            <TextField
              label="Fecha de Expiración"
              variant="outlined"
              name="expirationDate"
              value={paymentDetails.expirationDate}
              onChange={handleInputChange}
              sx={{
                flex: 1,
                backgroundColor: "rgba(45, 43, 56, 1)",
                borderRadius: "5px",
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            />
            <TextField
              label="CVV"
              variant="outlined"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              sx={{
                flex: 1,
                backgroundColor: "rgba(45, 43, 56, 1)",
                borderRadius: "5px",
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <Button
          variant="outlined"
          color="error"
          onClick={onCancel}
          sx={{
            flex: 1,
            marginRight: "10px",
            color: "rgba(255, 87, 87, 1)",
            borderColor: "rgba(234, 124, 105, 1)",
            "&:hover": {
              borderColor: "rgba(234, 124, 105, 0.8)",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => onConfirm(paymentDetails)}
          sx={{
            flex: 1,
            backgroundColor: "rgba(234, 124, 105, 1)",
            "&:hover": {
              backgroundColor: "rgba(234, 124, 105, 0.9)",
            },
          }}
        >
          Confirmar Pago
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentAside;
