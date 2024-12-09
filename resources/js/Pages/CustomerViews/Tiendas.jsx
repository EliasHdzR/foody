import React, { useState } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Busqueda from "./Dashboard/Busqueda";
import CartAside from "@/Components/Cart/CartAside";
import PaymentAside from "@/Components/PaymentAside";
import CategoriesTabs from "@/Components/CategoriesTabs";
import defaultImage from "../../../assets/image.png"; 

export default function Tiendas({ restaurant = {}, products = [] }) {
    const [showPayment, setShowPayment] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [discount, setDiscount] = useState(0);

    const restaurantImage = restaurant.image_url ? `/storage/${restaurant.image_url}` : defaultImage;
    const restaurantCategory = restaurant.category?.name || "Categoría no disponible";
    const restaurantAddress = restaurant.address || "Dirección no disponible";

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems((prevItems) =>
            prevItems
                .map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = cartItems.length > 0 ? 50 : 0;
    const tax = subtotal * 0.16;
    const total = subtotal + shippingCost + tax - discount;

    const handleApplyCoupon = (couponCode) => {
        const coupon = restaurant.coupons?.find(c => c.code === couponCode);
        if (coupon) {
            if (coupon.discount) {
                setDiscount(coupon.discount);
            } else if (coupon.discount_percent) {
                setDiscount(subtotal * (coupon.discount_percent / 100));
            }
        } else {
            setDiscount(0);
        }
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: showPayment ? "2fr 1fr" : "3fr 1fr",
                gridTemplateRows: "auto 1fr",
                height: "100vh",
                backgroundColor: "rgb(31 41 55)",
                overflow:"auto"
            }}
        >
            <div
                style={{
                    gridColumn: "1 / span 1",
                    gridRow: "1 / span 1",
                    backgroundImage: `url(${restaurantImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "20px",
                    borderRadius: "8px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {restaurant.name || "Nombre no disponible"}
                    </h1>
                    <p style={{ fontSize: "16px" }}>{restaurantCategory}</p>
                    <p style={{ fontSize: "14px" }}>{restaurantAddress}</p>
                </div>
                <Busqueda className="bg-slate-900" />
            </div>

            <div
                style={{
                    gridColumn: "1 / span 1",
                    gridRow: "2 / span 1",
                    padding: "20px",
                }}
            >
                <CategoriesTabs
                    categories={restaurant.product_categories || []}
                    products={products}
                    addToCart={addToCart}
                />
            </div>

            <div
                style={{
                    gridColumn: "2 / span 1",
                    gridRow: "1 / span 2",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "rgb(17 24 39)",
                    padding: "20px",
                    borderRadius: "8px",
                }}
            >
                <CartAside
                    items={cartItems}
                    subtotal={subtotal}
                    shipping={shippingCost}
                    tax={tax}
                    total={total}
                    discount={discount}
                    onCheckout={() => setShowPayment(true)}
                    onRemove={removeFromCart}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onApplyCoupon={handleApplyCoupon}
                    coupons={restaurant.coupons || []}
                />
                {showPayment && (
                    <PaymentAside
                        onCancel={() => setShowPayment(false)}
                        onConfirm={() => console.log("Pago Confirmado")}
                        restaurantID={restaurant.id}
                        cartItems={cartItems}
                        subtotal={subtotal}
                        discount={discount}
                        total={total}
                        shippingCost={shippingCost}
                        tax={tax}
                    />
                )}
            </div>
        </div>
    );
}

Tiendas.layout = (page) => <Layout children={page} type={"customer"} />;
