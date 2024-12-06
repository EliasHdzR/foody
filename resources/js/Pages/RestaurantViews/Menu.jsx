import { useState } from 'react';
import SideBar from './SideBar';
import Modal from './Modal';

const initialProducts = [
  { id: 1, name: 'Producto 1', type: 'Comida', price: '10.00', image: '/images/Hamburger.jpg', description: 'Descripción del producto 1' },
  { id: 2, name: 'Producto 2', type: 'Bebida', price: '15.00', image: '/images/Hamburger.jpg', description: 'Descripción del producto 2' },
  { id: 3, name: 'Producto 3', type: 'Postre', price: '8.00', image: '/images/Hamburger.jpg', description: 'Descripción del producto 3' },
  { id: 4, name: 'Producto 4', type: 'Comida', price: '12.00', image: '/images/Hamburger.jpg', description: 'Descripción del producto 4' },
];

const categories = ['Comida', 'Bebida', 'Postre'];

const Menu = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    closeSidebar();
  };




  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    closeModal();
  };
  


  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Todas' || product.type === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const { type } = product;
    if (!acc[type]) acc[type] = [];
    acc[type].push(product);
    return acc;
  }, {});

  return (
    <div className="flex w-full bg-gray-100 min-h-screen py-10 px-4">
      <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Menú Tienda</h2>

        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={openModal}
            className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Agregar
          </button>
        </div>

        <div className="mb-10">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Todas">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">{category}</h3>
            <div className="space-y-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="flex items-center p-5 bg-white border border-gray-200 rounded-lg shadow cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-4"
                >
                  <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden mr-6">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-base text-gray-500">{product.description}</p>
                  </div>

                  <div className="text-2xl font-bold text-blue-500">${product.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Agregar Producto">
        <AddProductForm onSubmit={handleAddProduct} />
      </Modal>

      {isSidebarOpen && selectedProduct && (
        <SideBar
          product={selectedProduct}
          onClose={closeSidebar}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

const AddProductForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Comida');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, type, price, description });
    setName('');
    setType('Comida');
    setPrice('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Categoría</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Precio</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
        Añadir Producto
      </button>
    </form>
  );
};


export default Menu;

