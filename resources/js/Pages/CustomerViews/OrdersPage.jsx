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

  const calculateOrderSummary = (order) => {
    console.log("Order in calculateOrderSummary:", order); // Log the order object

    const subtotal = order.products.reduce((sum, product) => sum + product.sold.quantity * product.price, 0);
    const tax = parseFloat(order.taxes); // Use the tax value directly from the order
    const total = subtotal + parseFloat(order.shipping_cost) + tax - parseFloat(order.discount);

    console.log("Subtotal:", subtotal); // Log subtotal
    console.log("Shipping Cost:", order.shipping_cost); // Log shipping cost
    console.log("Tax:", tax); // Log tax
    console.log("Discount:", order.discount); // Log discount
    console.log("Total:", total); // Log total

    return {
      subtotal: subtotal.toFixed(2),
      deliveryFee: parseFloat(order.shipping_cost).toFixed(2), // Ensure shipping_cost is a number
      tax: tax.toFixed(2), // Ensure tax is a number
      discount: parseFloat(order.discount).toFixed(2), // Ensure discount is a number
      total: total.toFixed(2),
    };
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
            }))}
            subtotal={calculateOrderSummary(selectedOrder).subtotal}
            deliveryFee={calculateOrderSummary(selectedOrder).deliveryFee}
            tax={calculateOrderSummary(selectedOrder).tax}
            discount={calculateOrderSummary(selectedOrder).discount}
            total={calculateOrderSummary(selectedOrder).total}
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