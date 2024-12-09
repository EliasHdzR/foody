import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/Components/Orders/Header";
import OrderDetails from "@/Components/Orders/OrderDetails";
import OrderList from "@/Components/Orders/OrderList";
import Layout from "@/Layouts/Layout";
import RestaurantDetails from "@/Components/Orders/RestaurantDetails";
import DriverDetails from "@/Components/Orders/DriverDetails"; // Import the new component

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(route('cliente.orders.fetch'))
      .then(response => {
        console.log("Fetched orders:", response.data); 
        setOrders(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the orders!", error);
        setError("Unable to fetch orders. Please try again later.");
      });
  }, []);

  const handleViewDetails = (order) => {
    console.log("Selected order:", order); 
    setSelectedOrder(order);
    fetchRestaurantDetails(order.id);
    fetchDriverDetails(order.id);
  };

  const fetchRestaurantDetails = (orderId) => {
    axios.get(route('orders.restaurant.details', { orderId }))
      .then(response => {
        console.log("Fetched restaurant details:", response.data); 
        setRestaurantDetails(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the restaurant details!", error);
        setError("Unable to fetch restaurant details. Please try again later.");
        setRestaurantDetails(null); // Ensure state is reset on error
      });
  };
  
  const fetchDriverDetails = (orderId) => {
    axios.get(route('orders.driver.details', { orderId }))
      .then(response => {
        console.log("Fetched driver details:", response.data);
        setDriverDetails(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the driver details!", error);
        setError("Unable to fetch driver details. Please try again later.");
        setDriverDetails(null); // Ensure state is reset on error
      });
  };

  const handleCancelOrder = (orderId) => {
    console.log("Cancelling order with ID:", orderId);
    axios.post(route('cliente.orders.cancel', { orderId }))
      .then(response => {
        console.log("Order canceled:", response.data);
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: 'canceled_customer' } : order
        ));
        setSelectedOrder(null);
        setRestaurantDetails(null);
        setDriverDetails(null);
      })
      .catch(error => {
        console.error("There was an error canceling the order!", error);
        setError("Unable to cancel order. Please try again later.");
      });
  };

  const canCancelOrder = (status) => {
    return ['pending', 'accepted', 'awaiting'].includes(status);
  };

  return (
    <div style={{ display: "flex", height: "100%", backgroundColor:"rgb(31 41 55)" }}>
      <div style={{ flex: 2, overflowY: "auto", maxHeight: "100vh", paddingRight: "10px" }}>
        <Header title="Mis Pedidos" />
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <OrderList
            orders={orders.map((order) => ({
              ...order,
              onViewDetails: () => handleViewDetails(order),
              onCancelOrder: canCancelOrder(order.status) ? () => handleCancelOrder(order.id) : null,
            }))}
          />
        )}
      </div>

      <div style={{ flex: 1, backgroundColor: "#1F1F2B", padding: "20px", overflowY: "auto", maxHeight: "100vh" }}>
        {selectedOrder && selectedOrder.products ? (
          <>
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
              restaurantImage={restaurantDetails?.image_url} 
            />
            <RestaurantDetails restaurant={restaurantDetails} />
            <DriverDetails driver={driverDetails} /> 
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
  <h1 className="text-white text-xl font-bold bg-gray-600 p-5 rounded-lg text-center shadow-md">
    Selecciona un pedido para ver los detalles
  </h1>
</div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

OrdersPage.layout = (page) => <Layout children={page} type={"customer"} />;
