import Layout from "@/Layouts/Layout";
import Menu from "./Menu";

export default function MenuStore() {
    return (
        <Layout>
            <Menu className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" />
        </Layout>
    );
}