import React, { useState, useEffect } from 'react';
import Layout from '@/Layouts/Layout.jsx';
import Tabla from '@/Components/Tabla.jsx';
import Modal from '@/Components/Modal';
import ProductForm from '../ProductForm.jsx';
import axios from 'axios';

const ProductsIndex = () => {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get(route('restaurante.products.index'));
        setProducts(response.data);
    };

    const addProduct = async (newProduct) => {
        const response = await axios.post(route('restaurante.products.store'), newProduct);
        setProducts([...products, response.data]);
        setSuccessMessage('Producto agregado exitosamente.');
        closeModal();
    };

    const editProduct = async (updatedProduct) => {
        const response = await axios.put(route('restaurante.products.update', updatedProduct.id), updatedProduct);
        setProducts(products.map((product) =>
            product.id === updatedProduct.id ? response.data : product
        ));
        setSuccessMessage('Producto editado exitosamente.');
        closeModal();
    };

    const deleteProduct = async (productId) => {
        await axios.delete(route('restaurante.products.destroy', productId));
        setProducts(products.filter((product) => product.id !== productId));
        setSuccessMessage('Producto eliminado exitosamente.');
    };

    const openModal = (type, product = null) => {
        setModalType(type);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const columns = [
        { id: 'name', label: 'Nombre', align: 'left' },
        { id: 'price', label: 'Precio', align: 'right' },
        { id: 'actions', label: 'Acciones', align: 'center' },
    ];

    const rows = products.map((product) => ({
        name: product.name,
        price: `$${product.price.toFixed(2)}`,
        actions: (
            <>
                <button
                    onClick={() => openModal('edit', product)}
                    className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Editar
                </button>
                <button
                    onClick={() => deleteProduct(product.id)}
                    className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                    Eliminar
                </button>
            </>
        ),
    }));

    return (
        <Layout>
            <div className="container mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Gestión de productos</h2>
                <div className="flex justify-end mb-2">
                <button onClick={() => openModal('add')} className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition">Agregar</button>
                </div>
                {successMessage && (
                    <div className="alert-success">
                        {successMessage}
                    </div>
                )}

                <Tabla
                    columns={columns}
                    rows={rows}
                    rowsPerPageCustom={10}
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={modalType === 'edit' ? 'Editar' : 'Agregar'}
                >
                    <ProductForm
                        product={selectedProduct || {}}
                        onUpdate={(data) => {
                            if (modalType === 'add') {
                                addProduct(data);
                            } else if (modalType === 'edit') {
                                editProduct(data);
                            }
                        }}
                    />
                </Modal>
            </div>
        </Layout>
    );
};

export default ProductsIndex;
