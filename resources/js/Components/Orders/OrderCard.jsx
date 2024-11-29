const OrderCard = ({ status, date, logo, restaurant, price, onCancel, onViewDetails }) => {
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
          <img src={logo} alt="Restaurant Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
          <div>
            <p style={{ color: "#FF9E00", margin: "0" }}>Estado: {status} {date && `- ${date}`}</p>
            <p style={{ color: "#fff", margin: "5px 0 0" }}>{restaurant}</p>
            <p style={{ color: "#fff", margin: "0" }}>MX${price}</p>
          </div>
        </div>
        <div>
          {onCancel && <button style={{ backgroundColor: "#FF6B6B", color: "#fff", padding: "10px", borderRadius: "5px", marginRight: "10px" }} onClick={onCancel}>Cancelar Pedido</button>}
          {onViewDetails && <button style={{ backgroundColor: "#FF9E00", color: "#fff", padding: "10px", borderRadius: "5px" }} onClick={onViewDetails}>Ver Detalles</button>}
        </div>
      </div>
    );
  };
  
  export default OrderCard;
  