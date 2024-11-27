import Layout from "@/Layouts/Layout.jsx";
import Busqueda from "./Dashboard/Busqueda";
import DashboardAside from "@/Components/Asidebar/DashboardAside";
import Platillos from "./Dashboard/Platillos";
import Resultados from "./Dashboard/Resultados";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "5fr 3fr", 
        height: "100vh", 
      }}
    >
      <div style={{ padding: "20px" }}>
        <Busqueda />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <Resultados>
            <Platillos />
          </Resultados>
        </div>
      </div>

      <DashboardAside />
    </div>
  );
};

Dashboard.layout = (page) => <Layout children={page} type={"customer"} />;
export default Dashboard;
