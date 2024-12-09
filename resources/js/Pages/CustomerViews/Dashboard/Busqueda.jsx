import { Search as SearchIcon } from "@mui/icons-material";
const Busqueda = () => {
  return (
    <div className="flex items-center bg-gray-800 rounded-3xl px-5 py-2.5 shadow-md">
      <SearchIcon className="text-gray-300 mr-2.5" />
      <input
        type="text"
        placeholder="Busca comidas, bebidas, restaurantes..."
        className="w-full text-sm text-gray-100 bg-transparent outline-none"
      />
    </div>
  );
};

export default Busqueda;
