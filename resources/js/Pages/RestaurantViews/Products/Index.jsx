import React, {useState} from 'react';
import Layout from '@/Layouts/Layout.jsx';
import TablaColapsable from '@/Components/TablaColapsable.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import {Alert, AlertTitle} from "@mui/material";
import RestaurantImage from "@/Components/RestaurantImage.jsx";
import AddProductForm from "@/Pages/RestaurantViews/Products/AddProductForm.jsx";
import EditProductForm from "@/Pages/RestaurantViews/Products/EditProductForm.jsx";
import DeleteProductForm from "@/Pages/RestaurantViews/Products/DeleteProductForm.jsx";

const ProductsIndex = ({products, restaurantID, ingredients}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (type, product = null) => {
        setModalType(type);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedProduct(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const columns = [
        {id: 'name', label: 'Nombre', align: 'left'},
        {id: 'code', label: 'Código', align: 'left'},
        {id: 'price', label: 'Precio', align: 'right'},
        {id: 'description', label: 'Descripción', align: 'left'},
        {id: 'availability', label: 'Disponibilidad', align: 'center'},
        {id: 'actions', label: '', align: 'center'},
    ];

    const collapsableColumns = [
        {id: 'name', label: 'Nombre', align: 'left'},
        {id: 'quantity', label: 'Cantidad Necesaria', align: 'right'},
        {id: 'stock', label: 'Cantidad en Stock', align: 'right'},
    ];

    const rows = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: `$${Number(product.price).toFixed(2)}`,
        code: product.code,
        description: product.description,
        availability: product.availability ? 'Disponible' : 'No disponible',
        actions: [
            <button onClick={() => openModal('info', product)}
                    className="ml-4 px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition">
                Ver
            </button>,
            <button onClick={() => openModal('edit', product)}
                    className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                Editar
            </button>,
            <button onClick={() => openModal('delete', product)}
                    className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                Eliminar
            </button>,
        ]
    }));

    const collapseRows = products.reduce((acc, product) => {
        product.ingredients.forEach((ingredient) => {
            acc.push({
                parentId: product.id,
                id: ingredient.id,
                name: ingredient.name,
                quantity: ingredient.quantity,
                stock: ingredient.stock,
            });
        });
        return acc;
    }, []);

    return (
        <div>
            {successMessage && (
                <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
                    <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                        <AlertTitle>Success</AlertTitle>
                        {successMessage}
                    </Alert>
                </div>
            )}
            <div className="container mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Gestión de productos</h2>
                <div className="flex justify-end mb-2">
                    <button onClick={() => openModal('add')}
                            className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition">
                        Agregar
                    </button>
                </div>

                <TablaColapsable
                    columns={columns}
                    rows={rows}
                    collapseColumns={collapsableColumns}
                    collapseRows={collapseRows}
                    subtitle="Ingredientes"
                />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'edit' ? 'Editar' :
                                                                    modalType === 'add' ? 'Agregar' :
                                                                    modalType === 'delete' ? 'Eliminar' : 'Ver'}>
                <div className="max-h-[80vh] overflow-y-auto">
                    {modalType === 'info' && <InfoProductForm product={selectedProduct} closeModal={closeModal}/>}
                    {modalType === 'add' && <AddProductForm ingredients={ingredients} restaurantID={restaurantID} closeModal={closeModal} onSuccess={handleSuccess}/>}
                    {modalType === 'edit' && <EditProductForm closeModal={closeModal} product={selectedProduct} onSuccess={handleSuccess} ingredients={ingredients}/>}
                    {modalType === 'delete' && <DeleteProductForm closeModal={closeModal} product={selectedProduct} onSuccess={handleSuccess}/>}
                </div>
            </Modal>
        </div>
    );
};

ProductsIndex.layout = (page) => <Layout children={page} type={'restaurant'}/>;

export default ProductsIndex;

const InfoProductForm = ({product, closeModal}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-80 text-center shadow-lg relative">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
                >
                    &times;
                </button>
                <div>
                    <RestaurantImage imagePath={product.image_url}/>
                </div>
                <h2 className="text-white text-lg font-bold mt-4">{product.name}</h2>
                <p className="text-gray-400 text-sm mt-2">{product.description}</p>
                <p className="text-gray-400 text-sm mt-2">${Number(product.price).toFixed(2)}</p>
                <p className="text-green-400 text-sm">{product.availability ? 'Disponible' : 'No Disponible'}</p>
            </div>
        </div>
    );
}
