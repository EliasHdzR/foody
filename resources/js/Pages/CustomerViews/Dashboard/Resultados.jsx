import React from "react";
import RestauranteCard from "./RestauranteCard";
import Destacados from "./Destacados";
import RatingStars from "./RatingStars";
import { Link } from "@inertiajs/react";

const Resultados = ({ restaurants = [], categories = [] }) => {
    const platillos = [
        { nombre: "Huevo Estrellado", precio: "$79.99", disponible: "Disponible", calificacion: 4 },
        { nombre: "Caldo de Camarón", precio: "$120.00", disponible: "Disponible", calificacion: 5 },
        { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 3 },
    ];

    return (
        <div className="space-y-12">
            <div>
                <h2 className="text-3xl font-semibold mb-4 text-white">Resultados</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {restaurants.map((restaurante) => (
                        <Link key={restaurante.id} href={route("cliente.restaurant.index", restaurante)}>
                            <RestauranteCard
                                logo={restaurante.image_url}
                                nombre={restaurante.name}
                                categoria={restaurante.category?.name || "Sin categoría"}
                                articulos={restaurante.products?.length || 0}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="font-3xl">
                <Destacados
                    items={platillos}
                    title="Destacados"
                    renderImage=""
                    renderDetails={(item) => (
                        <>
                            <h3 className="text-xl font-bold text-white">{item.nombre}</h3>
                            <p className="text-lg text-gray-400 mt-4">{item.precio}</p>
                            <p className="text-lg text-gray-400 mt-4">{item.disponible}</p>
                            <RatingStars rating={item.calificacion} />
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default Resultados;
