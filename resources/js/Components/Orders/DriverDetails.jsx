import React from 'react';

const DriverDetails = ({ driver }) => {
  if (!driver) return null;

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
      <h3 style={{ marginBottom: "20px", borderBottom: "1px solid #333", paddingBottom: "10px" }}>Repartidor</h3>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ color: "#aaa" }}>Nombre:</span>
        <span>{driver.name}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ color: "#aaa" }}>Inicio de turno:</span>
        <span>{driver.shift_start}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ color: "#aaa" }}>Fin de turno:</span>
        <span>{driver.shift_end}</span>
      </div>
    </div>
  );
};

export default DriverDetails;