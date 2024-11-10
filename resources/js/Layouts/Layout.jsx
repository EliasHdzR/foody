import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";

export default function Layout({ children }) {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-shrink-0">
                <Navbar />
            </div>

            <div className="flex flex-1 overflow-hidden">
                <div className="flex-shrink-0 w-64 bg-gray-100 shadow-md overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
