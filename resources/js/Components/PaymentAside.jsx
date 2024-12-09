import React, {useState} from "react";
import {Box, Typography, Button, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useForm} from "@inertiajs/react";

const PaymentAside = ({onCancel, onConfirm, restaurantID, cartItems, total, subtotal, discount, shippingCost, tax}) => {
    const [paymentMethod, setPaymentMethod] = useState("Tarjeta");
    const paymentDetails = {
        ownerName: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        cartItems: cartItems,
        total_price: total,
        subtotal: subtotal,
        discount: discount,
        shipping_cost: shippingCost,
        taxes: tax,
    };

    console.log(cartItems);

    const handlePaymentMethodChange = (event, newMethod) => {
        if (newMethod !== null) {
            setPaymentMethod(newMethod);
        }
    };

    const {data, errors, setData, post} = useForm(paymentDetails);

    const submit = (e) => {
        e.preventDefault();
        post(route('cliente.restaurant.store', { restaurant: restaurantID }));
    }

    return (
        <Box
            sx={{
                width: "100%",
                maxHeight: "100vh",
                height: "65%",
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
                    sx={{marginBottom: "10px", fontWeight: "bold", color: "#fff"}}
                >
                    Métodos de Pago Disponibles
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
                    {["Tarjeta"].map((method) => (
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
                <form onSubmit={submit}>
                    <Box>
                        <TextField
                            label="Nombre del Propietario"
                            variant="outlined"
                            fullWidth
                            name="ownerName"
                            value={data.ownerName}
                            onChange={(e) => setData('ownerName', e.target.value)}
                            error={!!errors.ownerName}
                            helperText={errors.ownerName}
                            sx={{
                                marginBottom: "15px",
                                backgroundColor: "rgba(45, 43, 56, 1)",
                                borderRadius: "5px",
                                input: {color: "#fff"},
                                "& .MuiInputLabel-root": {color: "#fff"},
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
                            value={data.cardNumber}
                            onChange={(e) => setData('cardNumber', e.target.value)}
                            error={!!errors.cardNumber}
                            helperText={errors.cardNumber}
                            sx={{
                                marginBottom: "15px",
                                backgroundColor: "rgba(45, 43, 56, 1)",
                                borderRadius: "5px",
                                input: {color: "#fff"},
                                "& .MuiInputLabel-root": {color: "#fff"},
                                "& .MuiOutlinedInput-root fieldset": {
                                    borderColor: "rgba(255, 255, 255, 0.2)",
                                },
                            }}
                        />
                        <Box sx={{display: "flex", gap: "15px"}}>
                            <TextField
                                label="Fecha de Expiración"
                                type={"date"}
                                variant="outlined"
                                name="expirationDate"
                                value={data.expirationDate}
                                onChange={(e) => setData('expirationDate', e.target.value)}
                                error={!!errors.expirationDate}
                                helperText={errors.expirationDate}
                                sx={{
                                    flex: 1,
                                    backgroundColor: "rgba(45, 43, 56, 1)",
                                    borderRadius: "5px",
                                    input: {
                                        color: "#fff",
                                    },
                                    "& .MuiInputLabel-root": {
                                        color: "#fff",
                                        transform: "translate(14px, -6px) scale(0.75)", // Forzamos que el label se posicione correctamente
                                    },
                                    "& .MuiOutlinedInput-root fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                    },
                                    "& .MuiOutlinedInput-root:hover fieldset": {
                                        borderColor: "rgba(234, 124, 105, 1)",
                                    },
                                    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "rgba(234, 124, 105, 1)",
                                    },
                                }}
                            />
                            <TextField
                                label="CVV"
                                variant="outlined"
                                name="cvv"
                                value={data.cvv}
                                onChange={(e) => setData('cvv', e.target.value)}
                                error={!!errors.cvv}
                                helperText={errors.cvv}
                                sx={{
                                    flex: 1,
                                    backgroundColor: "rgba(45, 43, 56, 1)",
                                    borderRadius: "5px",
                                    input: {color: "#fff"},
                                    "& .MuiInputLabel-root": {color: "#fff"},
                                    "& .MuiOutlinedInput-root fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
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
                            type={"submit"}
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
                </form>
            </Box>
        </Box>
    );
};

export default PaymentAside;
