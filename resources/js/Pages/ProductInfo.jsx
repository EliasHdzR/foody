import Layout from "@/Layouts/Layout";
import { useState } from "react";

export default function ProductInfo({
    productData = {
        name: "Maggi",
        id: "456567",
        category: "Instant food",
        creationDate: "13/4/23",
        cantidad: 12,
        store: {
            name: "Soriana",
            contactNumber: "1234567890",
        },
        image: "/path/to/product-image.png"
    },
    title = "Sabritas Maggi",
    onEdit = () => console.log("Editar producto"),
    onDelete = () => console.log("Eliminar producto")
}) {
    const [product] = useState(productData);

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-6">{title}</h1>
                <div className="bg-gray-100 rounded-lg shadow-lg p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Resumen</h2>
                        <div className="flex space-x-2">
                            <button 
                                onClick={onEdit} 
                                className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={onDelete} 
                                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex space-x-8">
                        <div className="flex-1">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-4">Detalles</h3>
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <h4 className="font-semibold">Nombre:</h4>
                                        <p>{product.name}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">ID:</h4>
                                        <p>{product.id}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Categoría:</h4>
                                        <p>{product.category}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Fecha de Creación:</h4>
                                        <p>{product.creationDate}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Cantidad:</h4>
                                        <p>{product.cantidad}</p>
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold mt-8 mb-4">Detalles de la Tienda</h3>
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <h4 className="font-semibold">Nombre:</h4>
                                        <p>{product.store.name}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">Número de Contacto:</h4>
                                        <p>{product.store.contactNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/4 flex items-center justify-center">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                                <p className="text-center text-gray-500 mb-2">Producto</p>
                                <img
                                    src={product.image}
                                    alt="Product"
                                    className="w-64 h-64 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
