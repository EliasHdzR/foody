import Tienda from '@/Components/Tienda.jsx';
import Layout from '@/Layouts/Layout.jsx';
import {Link} from "@inertiajs/react";

export default function Index({restaurants}) {
    console.log(restaurants);
    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Restaurantes</h1>
            <div className="flex justify-end mb-2">
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
                    <Link href={route('admin.categories.index')}>Ver Categorías</Link>
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                {restaurants && restaurants.length > 0 ? (
                    restaurants.map((restaurant, index) => (
                        <Tienda
                            key={index}
                            logo={restaurant.logo}
                            nombre={restaurant.name}
                            direccion={restaurant.address}
                            telefono={restaurant.phone_number}
                            rutaInventario={`restaurantes/${restaurant.id}/productos`}
                            rutaEdicion={() => console.log(`Tocaste ${restaurant.nombre}`)}
                        />
                    ))
                ) : (
                    <p>No hay restaurantes registrados.</p>
                )}
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} type={'admin'}/>;
