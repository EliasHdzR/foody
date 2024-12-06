import Layout from "@/Layouts/Layout.jsx";
import DashboardAside from "@/Components/Asidebar/DashboardAside";
import Resultados from "./Dashboard/Resultados";

const Dashboard = ({restaurants, categories}) => {
    return (
        <div className="grid grid-cols-[5fr_3fr] bg-slate-800 h-screen text-white overflow-hidden">
            <div className="p-5 space-y-6 overflow-auto">
                <Resultados
                    restaurants={restaurants}
                    categories={categories}
                />
            </div>

            <div className="overflow-auto">
                <DashboardAside
                    categories={categories}
                />
            </div>
        </div>
    );
};

Dashboard.layout = (page) => <Layout children={page} type={"customer"}/>;
export default Dashboard;

