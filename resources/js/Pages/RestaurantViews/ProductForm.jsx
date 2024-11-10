import { useState } from 'react';

const ProductForm = ({ product, onUpdate }) => {
  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);

  const handleSave = () => {
    const updatedProduct = {
      ...product,
      name,
      type,
      price,
      description,
    };
    onUpdate(updatedProduct);
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Editar Producto</h3>
      <div className="mb-4">
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Tipo</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Guardar
      </button>
    </div>
  );
};

export default ProductForm;
