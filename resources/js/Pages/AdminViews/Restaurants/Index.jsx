import Tienda from '@/Components/Tienda.jsx';
import Layout from '@/Layouts/Layout.jsx';

export default function Index({restaurants}) {
    return (
        <div className="w-full bg-gray-100 min-h-full py-10 px-4">
            <div className="w-full max-w-8xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Restaurantes</h2>

                <div className="bg-gray-100 p-6 rounded-lg shadow">
                    {restaurants && restaurants.length > 0 ? (
                        restaurants.map((restaurant, index) => (
                            <Tienda
                                key={index}
                                logo={restaurant.image_url}
                                nombre={restaurant.name}
                                categoria={restaurant.category.name}
                                direccion={restaurant.address + ', ' + restaurant.city + ', ' + restaurant.state}
                                telefono={restaurant.user.phone_number}
                                abre={restaurant.opening_time}
                                cierra={restaurant.close_time}
                                rutaProductos={ route("admin.restaurant.products.index", restaurant.id) }
                                rutaPedidos={ route("admin.restaurant.orders.index", restaurant.id) }
                                rutaInventario={ route("admin.restaurant.inventory.index", restaurant.id) }
                            />
                        ))
                    ) : (
                        <p>No hay restaurantes registrados.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} type={'admin'}/>;
