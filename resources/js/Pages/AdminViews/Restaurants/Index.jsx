import Tienda from '@/Components/Tienda.jsx';
import Layout from '@/Layouts/Layout.jsx';
import { useTheme } from "@mui/material";
import { tokens } from "@/theme.js";

export default function Index({ restaurants }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div
            className="w-full min-h-full py-10 px-4"
            style={{ backgroundColor: colors.primary[700] }}
        >
            <div
                className="w-full max-w-8xl mx-auto shadow-2xl rounded-lg p-10"
                style={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
            >
                <h2
                    className="text-4xl font-extrabold mb-10 text-center"
                    style={{ color: colors.greenAccent[500] }}
                >
                    Restaurantes
                </h2>

                <div
                    className="p-6 rounded-lg shadow"
                    style={{ backgroundColor: colors.primary[800] }}
                >
                    {restaurants && restaurants.length > 0 ? (
                        restaurants.map((restaurant, index) => (
                            <Tienda
                                key={index}
                                logo={restaurant.image_url}
                                nombre={restaurant.name}
                                categoria={restaurant.category.name}
                                direccion={`${restaurant.address}, ${restaurant.city}, ${restaurant.state}`}
                                telefono={restaurant.user.phone_number}
                                abre={restaurant.opening_time}
                                cierra={restaurant.close_time}
                                rutaProductos={route(
                                    "admin.restaurant.products.index",
                                    restaurant.id
                                )}
                                rutaPedidos={route(
                                    "admin.restaurant.orders.index",
                                    restaurant.id
                                )}
                                rutaInventario={route(
                                    "admin.restaurant.inventory.index",
                                    restaurant.id
                                )}
                                rutaCategorias={route(
                                    "admin.restaurant.categories.index",
                                    restaurant.id
                                )}
                            />
                        ))
                    ) : (
                        <p style={{ color: colors.grey[300] }}>
                            No hay restaurantes registrados.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} type={'admin'} />;
