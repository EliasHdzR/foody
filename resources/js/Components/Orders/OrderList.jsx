import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {
  console.log("OrderList orders:", orders); // Log orders

  return (
    <div style={{ padding: "20px" }}>
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          id={order.id}
          number={order.number}
          status={order.status}
          updated_at={order.updated_at}
          subtotal={order.subtotal}
          shipping_cost={order.shipping_cost}
          taxes={order.taxes}
          discount={order.discount}
          total_price={order.total_price}
          restaurant={order.restaurant}
          onViewDetails={order.onViewDetails}
          onCancelOrder={order.onCancelOrder}
        />
      ))}
    </div>
  );
};

export default OrderList;