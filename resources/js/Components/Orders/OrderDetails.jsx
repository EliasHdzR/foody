const OrderDetails = ({ items, subtotal, deliveryFee, tax, discount, total }) => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1F1F2B",
        borderRadius: "10px",
        color: "#fff",
        width: "100%",
      }}
    >
      <h3 style={{ marginBottom: "20px", borderBottom: "1px solid #333", paddingBottom: "10px" }}>Artículos</h3>
      <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "15px",
              borderBottom: "1px solid #333",
              paddingBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", flex: "3" }}>
              <img
                src="/path/to/pizza.png"
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                  marginRight: "10px",
                }}
              />
              <div>
                <p style={{ margin: "0", fontSize: "14px", fontWeight: "bold" }}>{item.name}</p>
                <p style={{ margin: "5px 0 0", fontSize: "12px", color: "#aaa" }}>${parseFloat(item.price).toFixed(2)}</p> {/* Ensure price is a number */}
              </div>
            </div>
            <div style={{ flex: "1", textAlign: "center" }}>
              <span
                style={{
                  backgroundColor: "#2C2C34",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  display: "inline-block",
                }}
              >
                {item.quantity}
              </span>
            </div>
            <div style={{ flex: "1", textAlign: "right" }}>
              <p style={{ margin: "0", fontWeight: "bold" }}>${(item.quantity * parseFloat(item.price)).toFixed(2)}</p> {/* Ensure price is a number */}
            </div>
          </li>
        ))}
      </ul>

      <div style={{ borderTop: "1px solid #333", paddingTop: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#aaa" }}>Subtotal:</span>
          <span>${subtotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#aaa" }}>Costo de Entrega:</span>
          <span>${deliveryFee}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#aaa" }}>IVA:</span>
          <span>${tax}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ color: "#aaa" }}>Descuento:</span>
          <span>${discount}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          <span>Total:</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;