import ApplicationLogo from '@/Components/ApplicationLogo';

export default function GuestLayout({ children }) {
    return (
        <div className="flex  min-h-screen items-center justify-center bg-gray-100">
            <div className="w-3/4 max-w-4xl bg-white px-12 py-8 shadow-md rounded-lg">
                {children}
            </div>
        </div>
    );
}
