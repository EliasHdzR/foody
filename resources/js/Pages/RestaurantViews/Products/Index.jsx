import React, {useState} from 'react';
import Layout from '@/Layouts/Layout.jsx';
import TablaColapsable from '@/Components/TablaColapsable.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import {Alert, AlertTitle} from "@mui/material";
import RestaurantImage from "@/Components/RestaurantImage.jsx";
import AddProductForm from "@/Pages/RestaurantViews/Products/AddProductForm.jsx";
import EditProductForm from "@/Pages/RestaurantViews/Products/EditProductForm.jsx";
import DeleteProductForm from "@/Pages/RestaurantViews/Products/DeleteProductForm.jsx";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProductsIndex = ({ products, restaurantID, ingredients, productCategories }) => {
    console.log(products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [nameFilter, setNameFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceRange, setPriceRange] = useState(['','']);
    const [availabilityFilter, setAvailabilityFilter] = useState('');
    const [descriptionFilter, setDescriptionFilter] = useState('');

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

    const handleNameFilterChange = (e) => setNameFilter(e.target.value);
    const handleCategoryFilterChange = (e) => setCategoryFilter(e.target.value);
    const handlePriceRangeChange = (value, index) => {
        const updatedRange = [...priceRange];
        updatedRange[index] = value === '' ? '' : Number(value);
        setPriceRange(updatedRange);
    };
    const priceValidation = (price) => {
        const minPrice = priceRange[0] === '' ? null : Number(priceRange[0]);
        const maxPrice = priceRange[1] === '' ? null : Number(priceRange[1]);

        if (minPrice === null && maxPrice === null) return true;
        if (minPrice !== null && maxPrice === null) return price >= minPrice;
        if (minPrice === null && maxPrice !== null) return price <= maxPrice;
        return minPrice <= maxPrice && price >= minPrice && price <= maxPrice;
    }
    const handleAvailabilityFilterChange = (e) => setAvailabilityFilter(e.target.value);
    const handleDescriptionFilterChange = (e) => setDescriptionFilter(e.target.value);

    const resetFilters = () => {
        setNameFilter('');
        setCategoryFilter('');
        setPriceRange(['','']);
        setAvailabilityFilter('');
        setDescriptionFilter('');
    };

    const filteredProducts = products.filter(product => {
        const matchesName = nameFilter ? product.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesCategory = categoryFilter ? product.category.name === categoryFilter : true;
        const matchesPrice = priceValidation(product.price);
        const matchesAvailability = availabilityFilter ? availabilityFilter === 'available' ? product.availability : !product.availability
            : true;
        const matchesDescription = descriptionFilter
            ? product.description.toLowerCase().includes(descriptionFilter.toLowerCase())
            : true;
        return matchesName && matchesCategory && matchesPrice && matchesAvailability && matchesDescription;
    });

    const columns = [
        { id: 'name', label: 'Nombre', align: 'left' },
        { id: 'code', label: 'Código', align: 'left' },
        { id: 'category', label: 'Categoría', align: 'left' },
        { id: 'price', label: 'Precio', align: 'right' },
        { id: 'description', label: 'Descripción', align: 'left' },
        { id: 'availability', label: 'Disponibilidad', align: 'center' },
        { id: 'actions', label: '', align: 'center' },
    ];

    const collapsableColumns = [
        { id: 'name', label: 'Nombre', align: 'left' },
        { id: 'quantity', label: 'Cantidad Necesaria', align: 'right' },
        { id: 'stock', label: 'Cantidad en Stock', align: 'right' },
    ];

    const rows = filteredProducts.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category.name,
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

    const collapseRows = filteredProducts.reduce((acc, product) => {
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

    const convertToCSV = (data) => {
        const exportableColumns = columns.filter(col => col.id && col.id !== 'actions');
        const headers = exportableColumns.map(col => col.label).join(',');
        const rows = data.map(row =>
            exportableColumns.map(col => {
                return row[col.id];
            }).join(',')
        ).join('\n');
        return `${headers}\n${rows}`;
    };

    const downloadCSV = () => {
        const csvData = convertToCSV(rows);
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'productos.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadPDF = () => {
        const doc = new jsPDF();

        const exportableColumns = columns.filter(col => col.id && col.id !== 'actions');
        const headers = exportableColumns.map(col => col.label);

        const cleanText = (text) =>
            typeof text === 'string' ? text.replace(/[\r\n]+/g, ' ').trim() : text;

        const data = rows.map(row =>
            exportableColumns.map(col => cleanText(row[col.id]))
        );

        doc.autoTable({
            head: [headers],
            body: data,
            styles: { cellPadding: 3, fontSize: 10 },
            startY: 10,
            theme: 'grid',
        });

        doc.save('productos.pdf');
    };

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
                <div className="flex justify-start mb-2">
                    <input
                        type="text"
                        placeholder="Filtrar por nombre"
                        value={nameFilter}
                        onChange={handleNameFilterChange}
                        className="mr-2 p-2 border rounded"
                    />
                    <select
                        value={categoryFilter}
                        onChange={handleCategoryFilterChange}
                        className="mr-2 p-2 border rounded"
                    >
                        <option value="">Categoría</option>
                        {productCategories.map(category => (
                            <option key={category.id} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Precio mínimo"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e.target.value, 0)}
                        className="mr-2 p-2 w-[10rem] border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Precio máximo"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e.target.value, 1)}
                        className="mr-2 p-2 w-[10rem] border rounded"
                    />
                    <select
                        value={availabilityFilter}
                        onChange={handleAvailabilityFilterChange}
                        className="mr-2 p-2 border rounded"
                    >
                        <option value="">Todos</option>
                        <option value="available">Disponible</option>
                        <option value="not_available">No disponible</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Filtrar por descripción"
                        value={descriptionFilter}
                        onChange={handleDescriptionFilterChange}
                        className="p-2 border rounded"
                    />
                    <button onClick={resetFilters}
                            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition">
                        Reiniciar
                    </button>
                    <button onClick={downloadCSV}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
                        Descargar CSV
                    </button>
                    <button onClick={downloadPDF}
                            className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
                        Descargar PDF
                    </button>
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
                    {modalType === 'add' &&
                        <AddProductForm ingredients={ingredients} restaurantID={restaurantID} productCategories={productCategories}
                                        closeModal={closeModal} onSuccess={handleSuccess}/>}
                    {modalType === 'edit' &&
                        <EditProductForm closeModal={closeModal} product={selectedProduct}  productCategories={productCategories}
                                         onSuccess={handleSuccess} ingredients={ingredients}/>}
                    {modalType === 'delete' && <DeleteProductForm closeModal={closeModal} product={selectedProduct}
                                                                  onSuccess={handleSuccess}/>}
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
