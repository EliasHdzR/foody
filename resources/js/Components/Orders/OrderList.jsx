import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {
  return (
    <div style={{ padding: "20px" }}>
      {orders.map((order, index) => (
        <OrderCard key={index} {...order} />
      ))}
    </div>
  );
};

export default OrderList;
