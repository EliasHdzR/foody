const ProductList = ({ products, onProductClick }) => {
    const groupedProducts = products.reduce((acc, product) => {
      const { type } = product;
      if (!acc[type]) acc[type] = [];
      acc[type].push(product);
      return acc;
    }, {});
  
    return (
      <>
        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">{category}</h3>
            <div className="space-y-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="flex items-center p-5 bg-white border border-gray-200 rounded-lg shadow cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-4"
                >
                  <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden mr-6">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-base text-gray-500">{product.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-blue-500">${product.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default ProductList;
  