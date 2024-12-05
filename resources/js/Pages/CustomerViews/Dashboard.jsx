import React, { useState, useEffect } from "react";
import Layout from "@/Layouts/Layout.jsx";
import Busqueda from "./Dashboard/Busqueda";
import DashboardAside from "@/Components/Asidebar/DashboardAside";
import Resultados from "./Dashboard/Resultados";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [platillos, setPlatillos] = useState([]);

  const fetchData = () => {
    const url = new URL("/cliente/search", window.location.origin);
    url.searchParams.append("query", query);
    if (category) {
      url.searchParams.append("category", category);
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setRestaurants(data.restaurants || []);
        setPlatillos(data.platillos || []);
      })
      .catch((err) => console.error("Error al obtener datos:", err));
  };

  useEffect(() => {
    fetchData();
  }, [query, category]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "5fr 3fr",
        height: "100vh",
      }}
    >
      <div style={{ padding: "20px" }}>
        <Busqueda onSearch={setQuery} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <Resultados restaurants={restaurants} platillos={platillos} />
        </div>
      </div>
      <DashboardAside
        onSelectCategory={setCategory}
        platillos={platillos}
      />
    </div>
  );
};

Dashboard.layout = (page) => <Layout children={page} type={"customer"} />;
export default Dashboard;
