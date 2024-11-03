
function Navbar() {
    return (
        <div className="navbar flex items-center justify-between p-4 shadow-sm bg-white">
            <h2 className="text-xl font-semibold text-gray-800">foody</h2>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none"
                />
                <button className="text-gray-600 hover:text-gray-800">
                    <i className="icon-bell"></i> {/**aun no está */}
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="laimagendeperfil.jpg" alt="Perfil" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}

export default Navbar;
