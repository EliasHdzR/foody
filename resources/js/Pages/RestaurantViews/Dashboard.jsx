import {Head} from '@inertiajs/react';
import Layout from "@/Layouts/Layout.jsx";

const Dashboard = () => {
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        DASHBOARD RESTAURANTES
                    </div>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <Layout children={page} type={'restaurant'}/>;
export default Dashboard;
