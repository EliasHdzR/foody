import Layout from "@/Layouts/Layout.jsx";
import Tabla from '@/Components/Tabla.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import { useState } from 'react';
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Alert, AlertTitle } from "@mui/material";

export default function Index({ ingredients }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (type, ingredient = null) => {
        setModalType(type);
        setSelectedIngredient(ingredient);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedIngredient(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const columns = [
        { id: 'name', label: 'Nombre' },
        { id: 'stock', label: 'Cantidad' },
        { id: 'created_at', label:'Fecha de creacion'},
        { id: 'updated_at', label:'Fecha de modificacion'},
        { id: 'actions', label: 'Acciones', align: 'center' }
    ];

    const rows = ingredients.map((ingredient) => ({
        name: ingredient.name,
        stock: ingredient.stock,
        created_at: ingredient.created_at,
        updated_at: ingredient.updated_at,
        actions: [
            <button onClick={() => openModal('edit', ingredient)}
                className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                Editar
            </button>,
            <button onClick={() => openModal('delete', ingredient)}
                className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                Eliminar
            </button>,
        ]
    }));

    return (
        <Layout>
            {successMessage && (
                <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
                    <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                        <AlertTitle>Success</AlertTitle>
                        {successMessage}
                    </Alert>
                </div>
            )}
            <div className="flex w-full bg-gray-100 min-h-screen py-10 px-4">
                <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Ingredientes</h2>
                    <div className="flex justify-end mb-2">
                       <button onClick={() => openModal('add')}
                            className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition">
                            Agregar
                        </button>
                    </div>

                    <Tabla
                        columns={columns}
                        rows={rows}
                        rowsPerPageCustom={10}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'edit' ? "Editar Ingrediente" : modalType === 'delete' ? "Eliminar Ingrediente" : "Agregar Ingrediente"}>
                {modalType === 'add' && <AddIngredientForm closeModal={closeModal} onSuccess={handleSuccess} />}
                {modalType === 'edit' && <EditIngredientForm closeModal={closeModal} ingredient={selectedIngredient} onSuccess={handleSuccess} />}
                {modalType === 'delete' && <DeleteIngredientForm closeModal={closeModal} ingredient={selectedIngredient} onSuccess={handleSuccess} />}
            </Modal>
        </Layout>
    );
}

const AddIngredientForm = ({ closeModal, onSuccess }) => {
    const initialValues = {
        name: "",
        stock: "", // Incluimos el stock inicial para el ingrediente
    };

    const { data, errors, setData, post } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('restaurante.ingredients.store'), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Ingrediente '${data.name}' agregado con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <InputLabel htmlFor="name" value="Nombre" />
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="stock" value="Cantidad en Stock" />
                <TextInput
                    id="stock"
                    type="number"
                    name="stock"
                    value={data.stock}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('stock', e.target.value)}
                />
                <InputError message={errors.stock} className="mt-2" />
            </div>
            <PrimaryButton>Agregar Ingrediente</PrimaryButton>
        </form>
    );
};

const EditIngredientForm = ({ closeModal, ingredient, onSuccess }) => {
    const initialValues = {
        name: ingredient.name,
        stock: ingredient.stock,
    };

    const { data, errors, setData, put } = useForm(initialValues);

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
            <InputLabel htmlFor="name" value="Nombre" />
            <TextInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData('name', e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
            <InputLabel htmlFor="stock" value="Cantidad en Stock" />
            <TextInput
                id="stock"
                type="number"
                name="stock"
                value={data.stock}
                className="mt-1 block w-full"
                onChange={(e) => setData('stock', e.target.value)}
            />
            <InputError message={errors.stock} className="mt-2" />
            <PrimaryButton>Guardar Cambios</PrimaryButton>
        </form>
    );
};

const DeleteIngredientForm = ({ closeModal, ingredient, onSuccess }) => {
    const { delete: destroy } = useForm();

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