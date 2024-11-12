import Tienda from '../../Components/Tienda.jsx';
import '../../../css/app.css';
import Layout from '@/Layouts/Layout.jsx';
import {Link} from "@inertiajs/react";

export default function Restaurants({ restaurants }) {
    return (
        <Layout>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Tiendas</h1>
            <Link href={route('admin.categories.index')}>Ver Categorías</Link>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-end mb-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Añadir</button>
                </div>
                {restaurants.map((restaurant, index) => (
                    <Tienda
                        key={index}
                        logo={restaurant.image_url}
                        nombre={restaurant.name}
                        branch={restaurant.name}
                        direccion={restaurant.address}
                        telefono={restaurant.phone_number}
                        rutaInventario="/inventario"
                        rutaEdicion={() => console.log(`Tocaste ${restaurant.name}`)}
                    />
                ))}
            </div>
        </Layout>
    );
}
