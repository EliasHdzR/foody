import Layout from "@/Layouts/Layout.jsx";
import React, {useState} from "react";
import {Alert, AlertTitle} from "@mui/material";
import Tabla from "@/Components/Tabla.jsx";
import Modal from "@/Pages/RestaurantViews/Modal.jsx";
import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import Header from "@/Components/Header";

const CategoriesIndex = ({categories}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (type, category = null) => {
        setModalType(type);
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedCategory(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const columns = [
        {id: 'name', label: 'Nombre'},
        {id: 'created_at', label: 'Fecha de Creación'},
        {id: 'updated_at', label: 'Última Actualización'},
        {id: 'actions', label: 'Acciones', align: 'center'}
    ];

    const rows = categories.map((category) => ({
        name: category.name,
        created_at: category.created_at,
        updated_at: category.updated_at,
        actions: [
            <button onClick={() => openModal('edit', category)}
                    className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                Editar
            </button>,
            <button onClick={() => openModal('delete', category)}
                    className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                Eliminar
            </button>,
        ]
    }));

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
            <div className="container p-6 mx-auto">
            <Header title="Categorias"></Header>
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

            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'edit' ? "Editar Categoría" : modalType === 'delete' ? "Eliminar Categoría" : "Agregar Categoría"}>
                {modalType === 'add' && <AddCategoryForm closeModal={closeModal} onSuccess={handleSuccess} />}
                {modalType === 'edit' && <EditCategoryForm closeModal={closeModal} category={selectedCategory} onSuccess={handleSuccess} />}
                {modalType === 'delete' && <DeleteCategoryForm closeModal={closeModal} category={selectedCategory} onSuccess={handleSuccess} />}
            </Modal>
        </div>
    );
}

CategoriesIndex.layout = (page) => <Layout children={page} type={'restaurant'}/>;

export default CategoriesIndex;

const AddCategoryForm = ({closeModal, onSuccess}) => {
    const initialValues = {
        name: "",
    };

    const {data, errors, setData, post} = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('restaurante.categories.store'), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Categoría '${data.name}' agregada con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4">
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
            <PrimaryButton>
                Agregar Categoría
            </PrimaryButton>
        </form>
    );
};

const EditCategoryForm = ({closeModal, category, onSuccess}) => {
    const initialValues = {
        name: category.name,
    };

    const {data, errors, setData, put} = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        put(route('restaurante.categories.update', category), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Categoría actualizada con éxito`);
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
                isFocused={true}
                className="mt-1 block w-full"
                onChange={(e) => setData('name', e.target.value)}
            />
            <InputError message={errors.name} className="mt-2"/>
            <PrimaryButton>Guardar Cambios</PrimaryButton>
        </form>
    );
};

const DeleteCategoryForm = ({closeModal, category, onSuccess}) => {
    const {data, delete: destroy} = useForm({name: category.name});

    const submit = (e) => {
        e.preventDefault();
        destroy(route('restaurante.categories.destroy', [category]), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Categoría '${category.name}' eliminada con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <Alert severity="warning">¿Estás seguro de que deseas eliminar la categoría '{data.name}'?</Alert>
            <div className="flex justify-end space-x-2">
                <PrimaryButton type="button" onClick={closeModal}>Cancelar</PrimaryButton>
                <PrimaryButton color="error">Eliminar</PrimaryButton>
            </div>
        </form>
    );
};
