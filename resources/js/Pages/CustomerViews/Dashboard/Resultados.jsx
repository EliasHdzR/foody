import React from "react";
import RestauranteCard from "./RestauranteCard";
import Destacados from "./Destacados";
import {Link} from "@inertiajs/react";

const Resultados = ({restaurants, products, filters}) => {
    console.log("lado resultados",filters);
    const filteredRestaurants = restaurants.filter((restaurant) => {
        return filters.category ? restaurant.category_id === filters.category : true;
    });

    const filteredProducts = Object.values(products).filter((product) => {
        const matchesPrice = product.price >= filters.priceFrom && product.price <= filters.priceTo;
        const matchesName = (filters.name && filters.name !== "") ? product.name.toLowerCase().includes(filters.name.toLowerCase()) : true;
        return matchesPrice && matchesName;
    });

    const platillos = filteredProducts.map((product) => ({
        index: product.id,
        restaurant_id: product.restaurant_id,
        nombre: product.name,
        precio: `$${product.price}`,
        disponible: "Disponible",
        imagen: product.image_url,
        calificacion: 5,
    }));

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-semibold mb-4 text-white">Resultados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredRestaurants.map((restaurante) => (
                        <Link key={restaurante.id} href={route("cliente.restaurant.index", restaurante)}>
                            <RestauranteCard
                                key={restaurante.id}
                                logo={restaurante.image_url}
                                nombre={restaurante.name}
                                categoria={restaurante.category.name}
                                articulos={restaurante.products.length}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="font-3xl">
                <Destacados
                    items={platillos}
                    title="Recién Agregados"
                    renderImage={(item) => (
                        <img
                            src={`/storage/${item.imagen}`}
                            alt="Imagen Platillo"
                            className="w-full h-full object-cover rounded-full"
                        />
                    )}
                    renderDetails={(item) => (
                        <div key={item.id}>
                            <h3 className="text-xl font-bold text-white">{item.nombre}</h3>
                            <p className="text-lg text-gray-400 mt-4">{item.precio}</p>
                            <p className="text-lg text-gray-400 mt-4">{item.disponible}</p>
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default Resultados;
