import { useState } from 'react';

const Menu = ({ productsCont, categories }) => {
    const [products] = useState(productsCont);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'Todas' || product.category.id.toString() === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const groupedProducts = filteredProducts.reduce((acc, product) => {
        const categoryName = product.category.name;
        if (!acc[categoryName]) acc[categoryName] = [];
        acc[categoryName].push(product);
        return acc;
    }, {});

    return (
        <div className="flex w-full bg-gray-100 min-h-screen py-10 px-4">
            <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Menú Tienda</h2>

                <div className="mb-10">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Categoría</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Todas">Todas</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id.toString()}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center mb-6">
                    <input
                        type="text"
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {Object.entries(groupedProducts).map(([categoryName, items]) => (
                    <div key={categoryName} className="mb-12">
                        <h3 className="text-3xl font-semibold text-gray-700 mb-6">{categoryName}</h3>
                        <div className="space-y-4">
                            {items.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center p-5 bg-white border border-gray-200 rounded-lg shadow cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-4"
                                >
                                    <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden mr-6">
                                        <img src={`/storage/${product.image_url}`} alt={product.name} className="w-full h-full object-cover"/>
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
        </div>
    );
};

export default Menu;
