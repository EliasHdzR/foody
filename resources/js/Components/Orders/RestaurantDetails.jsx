import React from 'react';

const RestaurantDetails = ({ restaurant }) => {
  if (!restaurant) return null;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1F1F2B",
        borderRadius: "10px",
        color: "#fff",
        width: "100%",
        marginTop: "20px",
      }}
    >
      <h3 style={{ marginBottom: "20px", borderBottom: "1px solid #333", paddingBottom: "10px" }}>Restaurante</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ color: "#aaa" }}>Nombre:</span>
        <span>{restaurant.name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ color: "#aaa" }}>Categoría:</span>
        <span>{restaurant.category_name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ color: "#aaa" }}>Dirección:</span>
        <span>{restaurant.address}</span>
      </div>
      {restaurant.image_url && (
        <img src={`/storage/${restaurant.image_url}`} alt={restaurant.name} style={{ width: "100%", maxHeight: "200px", objectFit: "cover", borderRadius: "8px", marginTop: "10px" }} />
      )}
    </div>
  );
};

export default RestaurantDetails;