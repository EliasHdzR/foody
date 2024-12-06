import React from "react";
import RestauranteCard from "./RestauranteCard";
import PizzaHut from "../../../../svg/PizzaHut.jsx";
import LittleCesar from "../../../../svg/LittleCesar.jsx";
import FoodExample from "../../../../svg/FoodExample.jsx";
import Destacados from "./Destacados";
import RatingStars from "./RatingStars";

const Resultados = () => {
  const restaurantes = [
    {
      nombre: "Pizza Hut",
      categoria: "Comida Americana",
      articulos: 20,
      logo: <PizzaHut className="w-full h-full" />,
    },
    {
      nombre: "Little Caesars",
      categoria: "Comida Americana",
      articulos: 10,
      logo: <LittleCesar className="w-full h-full" />,
    },
    {
      nombre: "Domino's Pizza",
      categoria: "Comida Americana",
      articulos: 15,
      logo: <LittleCesar className="w-full h-full" />,
    },
    {
      nombre: "Pizza Hut",
      categoria: "Comida Americana",
      articulos: 20,
      logo: <PizzaHut className="w-full h-full" />,
    },
    {
      nombre: "Little Caesars",
      categoria: "Comida Americana",
      articulos: 10,
      logo: <LittleCesar className="w-full h-full" />,
    },
    {
      nombre: "Domino's Pizza",
      categoria: "Comida Americana",
      articulos: 15,
      logo: <LittleCesar className="w-full h-full" />,
    },
  ];

  const platillos = [
    { nombre: "Huevo Estrellado", precio: "$79.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Caldo de Camarón", precio: "$120.00", disponible: "Disponible", calificacion: 5 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 3 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 3 },
    { nombre: "Huevo Estrellado", precio: "$79.99", disponible: "Disponible", calificacion: 4 },
    { nombre: "Caldo de Camarón", precio: "$120.00", disponible: "Disponible", calificacion: 5 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 3 },
    { nombre: "Fideos", precio: "$69.99", disponible: "Disponible", calificacion: 3 },

  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-semibold mb-4 text-white">Resultados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {restaurantes.map((restaurante, index) => (
            <RestauranteCard
              key={index}
              logo={restaurante.logo}
              nombre={restaurante.nombre}
              categoria={restaurante.categoria}
              articulos={restaurante.articulos}
            />
          ))}
        </div>
      </div>

      <div className="font-3xl">
      <Destacados
        items={platillos}
        title="Destacados"
        renderImage={(item) => (
          <FoodExample className="w-full h-full  object-cover rounded-full border-4 border-accent" />
        )}
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
