import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {

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
          status={statusSetter(order.status)}
          updated_at={order.updated_at}
          total_price={order.total_price}
          restaurant={order.restaurant}
          restaurant_image={order.restaurant.image_url}
          onViewDetails={order.onViewDetails}
          onCancelOrder={order.onCancelOrder}
        />
      ))}
    </div>
  );
};

export default OrderList;
