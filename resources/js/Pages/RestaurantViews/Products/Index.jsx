import React, {useState} from 'react';
import Layout from '@/Layouts/Layout.jsx';
import TablaColapsable from '@/Components/TablaColapsable.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import {Alert, AlertTitle, MenuItem, Select} from "@mui/material";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Input from '@mui/joy/Input';
import PriceFormatInput from '@/Components/PriceFormatInput.jsx';
import {Textarea} from "@mui/joy";

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
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'edit' ? 'Editar' : 'Agregar'}>
                <div className="max-h-[80vh] overflow-y-auto">
                    {modalType === 'add' && <AddProductForm ingredients={ingredients} restaurantID={restaurantID} closeModal={closeModal} onSuccess={handleSuccess}/>}
                    {modalType === 'edit' && <EditProductForm closeModal={closeModal} ingredient={selectedProduct} onSuccess={handleSuccess}/>}
                    {modalType === 'delete' && <DeleteProductForm closeModal={closeModal} ingredient={selectedProduct} onSuccess={handleSuccess}/>}
                </div>
            </Modal>
        </div>
    );
};

ProductsIndex.layout = (page) => <Layout children={page} type={'restaurant'}/>;

export default ProductsIndex;

const AddProductForm = ({ingredients, restaurantID, closeModal, onSuccess}) => {
    const initialValues = {
        name: "",
        code: "",
        price: 0,
        ingredients: [],
        description: "",
        availability: false,
    };

    const {data, errors, setData, post} = useForm(initialValues);
    const [selectedIngredients, setSelectedIngredients] = useState([{...ingredients[0], quantity: 1}]);

    const addIngredient = (e) => {
        e.preventDefault();
        setSelectedIngredients([...selectedIngredients, {...ingredients[0], quantity: 1}]);
    }

    const removeIngredient = (e, index) => {
        e.preventDefault();
        setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
    }

    const setIngredient = (index, ingredientId) => {
        const updatedIngredients = selectedIngredients.map((item, i) =>
            i === index ? {...ingredients.find(ing => ing.id === ingredientId), quantity: item.quantity} : item
        );
        setSelectedIngredients(updatedIngredients);
        setData('ingredients', updatedIngredients);
    }

    const setAmount = (index, amount) => {
        const updatedIngredients = selectedIngredients.map((item, i) =>
            i === index ? {...item, quantity: amount} : item
        );
        setSelectedIngredients(updatedIngredients);
        setData('ingredients', updatedIngredients);
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('restaurante.products.store'), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Producto '${data.name}' agregado con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4 overflow-scroll">
            <div>
                <InputLabel htmlFor="name" value="Nombre"/>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="code" value="Código"/>
                <Input
                    id="code"
                    startDecorator={`#${restaurantID}-`}
                    type="text"
                    name="code"
                    value={data.code}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('code', e.target.value)}
                />
                <InputError message={errors.code} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="price" value="Precio"/>
                <Input
                    startDecorator={'$'}
                    type="price"
                    id="price"
                    name="price"
                    value={data.price}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('price', e.target.value)}
                    slotProps={{
                        input: {
                            component: PriceFormatInput,
                            min: 0,
                        },
                    }}
                />
                <InputError message={errors.price} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="description" value="Descripción"/>
                <Textarea
                    id="description"
                    type="text"
                    name="description"
                    placeholder={'Descripción del producto'}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    minRows={4}
                />
                <InputError message={errors.description} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="ingredients" value="Ingredientes"/>
                {selectedIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-4">
                        <Select
                            id="ingredient"
                            value={ingredient.id}
                            onChange={(e) => setIngredient(index, e.target.value)}
                            className="mt-1 block w-full h-10 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {ingredients.map((ingredient) => (
                                <MenuItem key={ingredient.id} value={ingredient.id}>
                                    {ingredient.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Input
                            type="number"
                            name={`ingredient-${index}`}
                            value={ingredient.quantity}
                            className="w-1/2"
                            onChange={(e) => setAmount(index, e.target.value)}
                        />
                        <button onClick={(e) => removeIngredient(e, index)} className="text-red-500">Eliminar</button>
                    </div>
                ))}
                <button onClick={addIngredient} className="text-blue-500">Agregar Ingrediente</button>
                <InputError message={errors.ingredients} className="mt-2"/>
            </div>
            <PrimaryButton>Agregar Producto</PrimaryButton>
        </form>
    );
};

const EditProductForm = ({closeModal, ingredient, onSuccess}) => {
    const initialValues = {
        name: ingredient.name,
        stock: ingredient.stock,
    };

    const {data, errors, setData, put} = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        put(route('restaurante.ingredients.update', ingredient), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Ingrediente '${data.name}' actualizado con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <InputLabel htmlFor="name" value="Nombre"/>
            <TextInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData('name', e.target.value)}
            />
            <InputError message={errors.name} className="mt-2"/>
            <InputLabel htmlFor="stock" value="Cantidad en Stock"/>
            <TextInput
                id="stock"
                type="number"
                name="stock"
                value={data.stock}
                className="mt-1 block w-full"
                onChange={(e) => setData('stock', e.target.value)}
            />
            <InputError message={errors.stock} className="mt-2"/>
            <PrimaryButton>Guardar Cambios</PrimaryButton>
        </form>
    );
};

const DeleteProductForm = ({closeModal, ingredient, onSuccess}) => {
    const {delete: destroy} = useForm();

    const submit = (e) => {
        e.preventDefault();
        destroy(route('restaurante.ingredients.destroy', ingredient), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Ingrediente '${ingredient.name}' eliminado con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <Alert severity="warning">¿Estás seguro de que deseas eliminar el ingrediente '{ingredient.name}'?</Alert>
            <div className="flex justify-end space-x-2">
                <PrimaryButton type="button" onClick={closeModal}>Cancelar</PrimaryButton>
                <PrimaryButton color="error">Eliminar</PrimaryButton>
            </div>
        </form>
    );
};
