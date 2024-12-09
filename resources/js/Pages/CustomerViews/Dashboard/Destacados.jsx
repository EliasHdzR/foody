import React from "react";
import {Link} from "@inertiajs/react";

const Destacados = ({ items, title, renderImage, renderDetails }) => {
  return (
    <div className="space-y-12">
      {/* Título */}
      <h2 className="text-3xl font-semibold mb-6 text-white">{title}</h2>
      {/* Contenedor de elementos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-10">
        {items.map((item, index) => (
          <Link
            key={index}
            href={route("cliente.restaurant.index", { id: item.restaurant_id, category: item.category_id })}
            className="bg-accent rounded-xl p-8 pt-20 text-center mt-4 shadow-md flex flex-col items-center relative"
          >
            <div className="absolute -top-14 w-32 h-32">
              {renderImage ? renderImage(item) : <div className="w-full h-full bg-gray-300 rounded-full" />}
            </div>
            <div className="mt-4">{renderDetails(item)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Destacados;
