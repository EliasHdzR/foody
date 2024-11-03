function Tienda({ logo, nombre, direccion, telefono, branch, onEdit }) {
    return (
        <div className="tienda bg-white p-4 rounded-lg shadow-sm flex items-center justify-between mb-4">
            <div className="flex items-center">
                {logo && <img src={logo} alt={`${nombre} logo`} className="w-20 h-20 object-contain mr-4" />}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{branch}</h3>
                    <h4 className="text-gray-600">{nombre}</h4>
                    <p className="text-gray-500 text-sm">{direccion}</p>
                    <p className="text-gray-500 text-sm">{telefono}</p>
                </div>
            </div>
            <button
                onClick={onEdit}
                className="text-blue-500 font-semibold border border-blue-500 rounded-lg px-4 py-1 hover:bg-blue-500 hover:text-white transition"
            >
                Edit
            </button>
        </div>
    );
}
export default Tienda;