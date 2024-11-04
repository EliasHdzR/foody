import Navbar from '@/Components/Navbar/Navbar';
import Sidebar from '@/Components/Sidebar/Sidebar';

export default function Layout({ children }) {
    return (
        <div className="layout-page h-screen flex flex-col">
            <Navbar />
            <div className="main-content flex flex-1">
                <Sidebar />
                <div className="content-area flex-1 p-6 bg-gray-100 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}