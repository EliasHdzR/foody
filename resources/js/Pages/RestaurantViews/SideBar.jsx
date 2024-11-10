import ProductForm from './ProductForm';

const SideBar = ({ product, onClose, onSave }) => {
  if (!product) return null;

  const handleSave = (updatedProduct) => {
    onSave(updatedProduct);
  };

  return (
    <div className="fixed top-0 right-0 w-full sm:w-1/3 h-full bg-white shadow-lg p-6 overflow-y-auto">
      <button
        onClick={onClose}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Cerrar
      </button>
      <ProductForm product={product} onUpdate={handleSave} />
    </div>
  );
};

export default SideBar;
