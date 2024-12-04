import {Link} from "@inertiajs/react";

function Tienda({logo, nombre, direccion, telefono, categoria, abre, cierra, rutaInventario, rutaPedidos, rutaProductos}) {
    console.log(logo)
    return (
        <div className="tienda bg-gray-100 p-4 rozunded-lg shadow-sm flex items-center justify-between mb-4">
            <div className="flex items-center">
                {logo &&
                    <img src={`/storage/${logo}`} alt={`${nombre} logo`} className="w-20 h-20 object-contain mr-4"/>}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{nombre}</h3>
                    <h4 className="text-gray-600">{categoria}</h4>
                    <p className="text-gray-500 text-sm">{direccion}</p>
                    <p className="text-gray-500 text-sm">{telefono}</p>
                    <p className="text-gray-500 text-sm">Horario: {abre} - {cierra}</p>
                </div>
            </div>
            <div>
                <div className={"flex items-stretch justify-between mb-4"}>
                    <Link href={rutaPedidos}
                          className="text-green-500 font-semibold border border-green-500 rounded-lg px-12 py-1 hover:bg-green-500 hover:text-white transition">
                        Ver Pedidos
                    </Link>
                </div>
                <div className={"flex items-stretch justify-between mb-4"}>
                    <Link href={rutaInventario}
                          className="text-orange-500 font-semibold border border-orange-500 rounded-lg px-10 py-1 hover:bg-orange-500 hover:text-white transition">
                        Ver Inventario
                    </Link>
                </div>
                <div className={"flex items-stretch justify-between mb-4"}>
                    <Link href={rutaProductos}
                          className="text-blue-500 font-semibold border border-blue-500 rounded-lg px-10 py-1 hover:bg-blue-500 hover:text-white transition">
                        Ver Productos
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Tienda;
