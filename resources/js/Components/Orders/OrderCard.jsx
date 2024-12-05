import moment from 'moment';

const OrderCard = ({ id, number, status, updated_at, subtotal, shipping_cost, taxes, discount, total_price, restaurant, onViewDetails, onCancelOrder }) => {
  console.log("OrderCard props:", { id, number, status, updated_at, subtotal, shipping_cost, taxes, discount, total_price, restaurant, onViewDetails, onCancelOrder }); // Log props

  const formattedDate = moment(updated_at).format("DD/MM/YYYY");

  return (
    <div style={{
      backgroundColor: "#2C2C34",
      borderRadius: "8px",
      padding: "20px",
      margin: "10px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <p style={{ color: "#FF9E00", margin: "0" }}>Estado: {status === 'canceled_customer' ? 'Cancelado por el usuario' : status} - {formattedDate}</p>
          <p style={{ color: "#fff", margin: "5px 0 0" }}>{restaurant?.name}</p> {/* Use optional chaining to avoid errors */}
          <p style={{ color: "#fff", margin: "0" }}>MX${total_price}</p>
        </div>
      </div>
      <div>
        {onViewDetails && <button style={{ backgroundColor: "#FF9E00", color: "#fff", padding: "10px", borderRadius: "5px", marginRight: "10px" }} onClick={onViewDetails}>Ver Detalles</button>}
        {status !== 'canceled_customer' && onCancelOrder && <button style={{ backgroundColor: "#FF0000", color: "#fff", padding: "10px", borderRadius: "5px" }} onClick={onCancelOrder}>Cancelar Pedido</button>}
      </div>
    </div>
  );
};

export default OrderCard;