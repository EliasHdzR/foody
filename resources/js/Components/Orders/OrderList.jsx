import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {
  console.log("OrderList orders:", orders); // Log orders

  const statusSetter = (status) => {
    if(status === 'pending') return 'Pendiente';
    if(status === 'accepted') return 'Aceptado';
    if(status === 'canceled_restaurant') return 'Cancelado por Restaurante';
    if(status === 'awaiting') return 'En espera';
    if(status === 'canceled_customer') return 'Cancelado por Cliente';
    if(status === 'canceled_driver') return 'Cancelado por Repartidor';
    if(status === 'on_way') return 'En camino';
    if(status === 'delivered') return 'Entregado';
  }

  return (
    <div style={{ padding: "20px" }}>
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          id={order.id}
          number={order.number}
          status={statusSetter(order.status)}
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