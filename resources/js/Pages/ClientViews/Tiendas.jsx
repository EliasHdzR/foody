import React, { useState } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Busqueda from "./Dashboard/Busqueda";
import CartAside from "@/Components/Cart/CartAside";
import PaymentAside from "@/Components/PaymentAside";
import CategoriesTabs from "@/Components/CategoriesTabs";

const itemsMock = [
    {
      id: 1,
      name: "Pizza Margarita",
      description: "Clásica con queso mozzarella",
      price: 10.5,
      quantity: 2,
    },
    {
      id: 2,
      name: "Hamburguesa Clásica",
      description: "Con papas fritas",
      price: 8.75,
      quantity: 1,
    },
    {
      id: 3, 
      name: "Hamburguesa Clásica",
      description: "Con papas fritas",
      price: 8.75,
      quantity: 1,
    },
    {
      id: 4, 
      name: "Hamburguesa Clásica",
      description: "Con papas fritas",
      price: 8.75,
      quantity: 1,
    },
  ];
  

export default function Tiendas() {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: showPayment ? "3fr 3fr" : "5fr 3fr",
        height: "100vh",
      }}
    >
      <div style={{ padding: "20px" }}>
        <Busqueda />
        <CategoriesTabs />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: showPayment ? "1fr 1fr" : "1fr",
          height: "100%",
        }}
      >
        <CartAside
          items={itemsMock}
          subtotal={29.75}
          shipping={5.0}
          tax={3.0}
          total={37.75}
          onCheckout={() => setShowPayment(true)} 
        />
        {showPayment && (
          <PaymentAside
            onCancel={() => setShowPayment(false)}
            onConfirm={() => console.log("Pago Confirmado")}
          />
        )}
      </div>
    </div>
  );
}

Tiendas.layout = (page) => <Layout children={page} type={"customer"} />;
