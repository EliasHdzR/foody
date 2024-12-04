import { useState } from "react";
import Header from "@/Components/Orders/Header";
import OrderDetails from "@/Components/Orders/OrderDetails";
import OrderList from "@/Components/Orders/OrderList";
import Layout from "@/Layouts/Layout";

const orders = [
  {
    id: 1,
    status: "En Proceso",
    date: null,
    logo: "/path/to/logo.png",
    restaurant: "Pizza Hut",
    price: "27.03",
    details: {
      items: [
        { name: "Otra Pizza Simple", quantity: 2, price: 2.29 },
        { name: "Una Pizza", quantity: 1, price: 2.69 },
        { name: "Pizza Sin Carne", quantity: 3, price: 3.49 },
        { name: "Pizza Hawaiana", quantity: 1, price: 3.29 },
      ],
      deliveryFee: 5.0,
      taxRate: 0.05,
      discount: 0.0,
    },
  },
  {
    id: 2,
    status: "Completado",
    date: "27 Octubre 2024",
    logo: "/path/to/logo.png",
    restaurant: "Pizza Hut",
    price: "27.03",
    details: {
      items: [
        { name: "Pizza de Pepperoni", quantity: 2, price: 5.99 },
        { name: "Pizza de Queso", quantity: 1, price: 3.99 },
        { name: "Pizza de Queso", quantity: 1, price: 3.99 },
        { name: "Pizza de Queso", quantity: 1, price: 3.99 },
        { name: "Pizza de Queso", quantity: 1, price: 3.99 },
        { name: "Pizza de Queso", quantity: 1, price: 3.99 },
      ],
      deliveryFee: 5.0,
      taxRate: 0.08,
      discount: 2.0,
    },
  },
];

const calculateOrderSummary = (details) => {
  const subtotal = details.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = subtotal * details.taxRate;
  const total = subtotal + details.deliveryFee + tax - details.discount;

  return {
    subtotal: subtotal.toFixed(2),
    deliveryFee: details.deliveryFee.toFixed(2),
    tax: tax.toFixed(2),
    discount: details.discount.toFixed(2),
    total: total.toFixed(2),
  };
};

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="flex h-full">
      <div className="flex-2 overflow-y-auto max-h-screen pr-2.5">
        <Header title="Mis Pedidos" />
        <OrderList
          orders={orders.map((order) => ({
            ...order,
            onViewDetails: () => handleViewDetails(order),
          }))}
        />
      </div>

      <div className="flex-1 bg-[#1F1F2B] p-5 overflow-y-auto max-h-screen">
        {selectedOrder ? (
          <OrderDetails
            {...selectedOrder.details}
            {...calculateOrderSummary(selectedOrder.details)}
          />
        ) : (
          <p className="text-white">Selecciona un pedido para ver los detalles</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

OrdersPage.layout = (page) => <Layout children={page} type={"customer"} />;
