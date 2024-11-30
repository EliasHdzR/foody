import {Box, Typography, Button, TextField} from "@mui/material";
import React, {useState} from "react";

const CartSummary = ({subtotal, shipping, tax, total, discount, onCheckout, onApplyCoupon, coupons}) => {
    const [couponCode, setCouponCode] = useState("");
    const [error, setError] = useState("");

    const handleApplyCoupon = () => {
        const coupon = coupons.find(c => c.code === couponCode);
        if (coupon) {
            onApplyCoupon(couponCode);
            setError("");
        } else {
            setError("El cupón no es válido");
        }
    };

    return (
        <Box sx={{marginTop: "20px", color: "#fff"}}>
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
                }}
            >
                <Typography variant="body2">Descuento</Typography>
                <Typography variant="body2">-${Number(discount).toFixed(2)}</Typography>
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
                    ${Number(total).toFixed(2)}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    marginTop: "10px",
                }}
            >
                <Typography variant="body1" fontWeight="bold">
                    Canjear Cupón
                </Typography>
                <TextField
                    variant="outlined"
                    disabled={subtotal === 0}
                    name="coupon"
                    placeholder="#####"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onBlur={handleApplyCoupon}
                    error={!!error}
                    helperText={error}
                    sx={{
                        width: "200px",
                        backgroundColor: "rgba(45, 43, 56, 1)",
                        borderRadius: "5px",
                        "& .MuiOutlinedInput-root": {
                            height: "40px",
                            "& fieldset": {
                                borderColor: "rgba(255, 255, 255, 0.2)",
                            },
                            "&:hover fieldset": {
                                borderColor: "rgba(234, 124, 105, 1)",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "rgba(234, 124, 105, 1)",
                            },
                        },
                        "& .MuiInputLabel-root": {
                            color: "#fff",
                            fontSize: "14px",
                        },
                        "& .MuiInputBase-input": {
                            padding: "8px 12px",
                            color: "#fff",
                        },
                    }}
                />
            </Box>
            <Box sx={{marginTop: "20px"}}>
                <Button
                    variant="contained"
                    disabled={subtotal === 0}
                    fullWidth
                    onClick={onCheckout}
                    sx={{
                        backgroundColor: "rgba(234, 124, 105, 1)",
                        color: "#fff",
                        "&:hover": {backgroundColor: "rgba(234, 124, 105, 0.9)"},
                    }}
                >
                    Continuar al Pago
                </Button>
            </Box>
        </Box>
    );
};

export default CartSummary;
