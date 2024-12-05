import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/Components/Orders/Header";
import OrderDetails from "@/Components/Orders/OrderDetails";
import OrderList from "@/Components/Orders/OrderList";
import Layout from "@/Layouts/Layout";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(route('cliente.orders.fetch'))
      .then(response => {
        console.log("Fetched orders:", response.data); // Log fetched orders
        setOrders(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the orders!", error);
        setError("Unable to fetch orders. Please try again later.");
      });
  }, []);

  const handleViewDetails = (order) => {
    console.log("Selected order:", order); // Log selected order
    setSelectedOrder(order);
  };

  const handleCancelOrder = (orderId) => {
    console.log("Cancelling order with ID:", orderId); // Log order ID
    axios.post(route('cliente.orders.cancel', { orderId }))
      .then(response => {
        console.log("Order canceled:", response.data); // Log canceled order
        setOrders(orders.map(order => order.id === orderId ? response.data.order : order));
        setSelectedOrder(response.data.order);
      })
      .catch(error => {
        console.error("There was an error canceling the order!", error);
        setError("Unable to cancel order. Please try again later.");
      });
  };

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 2, overflowY: "auto", maxHeight: "100vh", paddingRight: "10px" }}>
        <Header title="Mis Pedidos" />
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <OrderList
            orders={orders.map((order) => ({
              ...order,
              onViewDetails: () => handleViewDetails(order),
              onCancelOrder: () => handleCancelOrder(order.id),
            }))}
          />
        )}
      </div>

      <div style={{ flex: 1, backgroundColor: "#1F1F2B", padding: "20px", overflowY: "auto", maxHeight: "100vh" }}>
        {selectedOrder && selectedOrder.products ? (
          <OrderDetails
            items={selectedOrder.products.map(product => ({
              name: product.name,
              quantity: product.sold.quantity,
              price: product.price,
              image_url: product.image_url,
            }))}
            subtotal={selectedOrder.subtotal}
            deliveryFee={selectedOrder.shipping_cost}
            tax={selectedOrder.taxes}
            discount={selectedOrder.discount}
            total={selectedOrder.total_price}
            status={selectedOrder.status}
          />
        ) : (
          <p style={{ color: "#fff" }}>Selecciona un pedido para ver los detalles</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

OrdersPage.layout = (page) => <Layout children={page} type={"customer"} />;
