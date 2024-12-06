import React from "react";

const RestauranteCard = ({ logo, nombre, categoria, articulos }) => {
  return (
    <div className="bg-accent rounded-xl p-4 flex items-center gap-4 shadow-md w-full max-w-lg">
      <div className="w-25 h-25  rounded-full flex items-center justify-center">
        {typeof logo === "string" ? (
          <img
            src={`/storage/${logo}`}
            alt={nombre}
            className="w-16 h-16 object-contain rounded-full"
          />
        ) : (
          logo
        )}
      </div>

      <div className="flex flex-col">
        <h3 className=" font-bold text-2xl text-white">{nombre}</h3>
        <p className=" text-gray-400 text-lg">{categoria}</p>
        <p className="font-semibold text-sm text-gray-400">{articulos} Artículos Disponibles</p>
      </div>
    </div>
  );
};

export default RestauranteCard;
