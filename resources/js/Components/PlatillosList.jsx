const PlatillosList = ({ platillos }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
      {platillos.map((platillo, index) => (
        <div
          key={index}
          className="bg-[#01594F] rounded-2xl p-6 flex flex-col items-center text-center shadow-lg transform transition-transform duration-200"
        >
          <div className="w-30 h-30 mb-4 rounded-lg overflow-hidden">
            <img
              src={platillo.image}
              alt={platillo.name}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-white font-bold text-xl">{platillo.name}</h3>
          <p className="text-white text-lg mt-1">{platillo.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PlatillosList;
