import Layout from "@/Layouts/Layout.jsx";
import DashboardAside from "@/Components/Asidebar/DashboardAside";
import Resultados from "./Dashboard/Resultados";
import {useState} from "react";

const Dashboard = ({restaurants, categories, products}) => {
    const [filters, setFilters] = useState({
        name: "",
        priceFrom: 0,
        priceTo: Infinity,
        category: null,
    });

    return (
        <div className="grid grid-cols-[5fr_3fr] bg-slate-800 h-screen text-white overflow-hidden">
            <div className="p-5 space-y-6 overflow-auto">
                <Resultados
                    restaurants={restaurants}
                    products={products}
                    filters={filters}
                />
            </div>

            <div className="overflow-auto">
                <DashboardAside
                    categories={categories}
                    setFilters={setFilters}
                />
            </div>
        </div>
    );
};

Dashboard.layout = (page) => <Layout children={page} type={"customer"}/>;
export default Dashboard;

