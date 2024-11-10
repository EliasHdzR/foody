import React, { useState } from 'react';

const ProductDetails = ({ product, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('Principal');
  const [name, setName] = useState(product.name);
  const [type, setType] = useState(product.type);
  const [price, setPrice] = useState(product.price);
  const [images, setImages] = useState(product.images || []);
  const [description, setDescription] = useState(product.description);

  const categories = ["Comida", "Bebida", "Postre"];

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      setImages([...images, newImage]);
    }
  };

  const handleSave = () => {
    console.log("Producto enviado a onSave:", product);
    const updatedProduct = {
      ...product,
      name,
      type,
      price,
      images,
      description,
    };
    onSave(updatedProduct); 
    onClose(); 
  };

  if (!product) return null;

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{name}</h3>
        <div className="flex space-x-4 items-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600 transition"
          >
            Guardar
          </button>

        </div>
      </div>

      <div>
        {activeTab === 'Principal' ? (

          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Nombre:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Tipo:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Precio:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

            <div className="mb-4">
              <div className="w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
                {images[0] ? (
                  <img src={images[0]} alt="Imagen principal" className="w-full h-full object-cover" />
                ) : (
                  <p className="text-center text-gray-500">No hay imagen principal</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {images.slice(1).map((image, index) => (
                <div key={index} className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden">
                  <img src={image} alt={`Imagen ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <label className="w-16 h-16 flex items-center justify-center border border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                <input type="file" accept="image/*" onChange={handleAddImage} className="hidden" />
                <span className="text-sm text-gray-500">Añadir</span>
              </label>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <label className="block text-gray-700 font-medium">Descripción:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md bg-gray-100 focus:outline-none h-24"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
