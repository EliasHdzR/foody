import Layout from "@/Layouts/Layout.jsx";
import Tabla from "@/Components/Tabla.jsx";
import Modal from "@/Pages/RestaurantViews/Modal";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Alert, AlertTitle, useTheme } from "@mui/material";
import { tokens } from "@/theme.js";
export default function Index({ categories }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
        { id: "name", label: "Nombre", style: { color: colors.grey[800] } },
        { id: "created_at", label: "Fecha de Creación", style: { color: colors.grey[800] } },
        { id: "updated_at", label: "Última Actualización", style: { color: colors.grey[800] } },
        { id: "actions", label: "Acciones", align: "center", style: { color: colors.grey[800] } },
    ];

    const rows = categories.map((category) => ({
        name: (
            <span style={{ color: colors.grey[100] }}>
                {category.name}
            </span>
        ),
        created_at: (
            <span style={{ color: colors.grey[100] }}>
                {category.created_at}
            </span>
        ),
        updated_at: (
            <span style={{ color: colors.grey[100] }}>
                {category.updated_at}
            </span>
        ),
        actions: [
            <button
                onClick={() => openModal("edit", category)}
                className="ml-4 px-4 py-2 rounded-lg font-semibold transition"
                style={{
                    backgroundColor: colors.greenAccent[500],
                    color: colors.grey[400],
                    border: `1px solid ${colors.greenAccent[500]}`,
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.greenAccent[600];
                    e.target.style.color = colors.grey[100];
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = colors.greenAccent[500];
                    e.target.style.color = colors.grey[900];
                }}
            >
                Editar
            </button>,
            <button
                onClick={() => openModal("delete", category)}
                className="ml-4 px-4 py-2 rounded-lg font-semibold transition"
                style={{
                    backgroundColor: colors.redAccent[500],
                    color: colors.grey[900],
                    border: `1px solid ${colors.redAccent[500]}`,
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = colors.redAccent[600];
                    e.target.style.color = colors.grey[100];
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = colors.redAccent[500];
                    e.target.style.color = colors.grey[900];
                }}
            >
                Eliminar
            </button>,
        ],
    }));


    return (
        <div>
            {successMessage && (
                <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
                    <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                        <AlertTitle style={{ color: colors.primary[700] }}>Éxito</AlertTitle>
                        <span style={{ color: colors.grey[700] }}>{successMessage}</span>
                    </Alert>
                </div>
            )}

            <div
                className="w-full min-h-screen py-10 px-4"
                style={{ backgroundColor: colors.primary[400] }}
            >
                <div
                    className="w-full max-w-8xl mx-auto shadow-2xl rounded-lg p-10"
                    style={{backgroundColor: "#FFFFFF", color: colors.grey[100]}}
                >
                    <h2
                      className="text-2xl font-bold mb-2 text-left"
                      style={{color: colors.grey[400]}}
                    >
                        Categorías
                    </h2>
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={() => openModal("add")}
                            className="ml-4 px-4 py-2 rounded-lg font-semibold transition"
                            style={{
                                backgroundColor: colors.blueAccent[500],
                                color: colors.grey[900],
                                border: `1px solid ${colors.blueAccent[500]}`,
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = colors.blueAccent[600];
                                e.target.style.color = colors.grey[100];
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = colors.blueAccent[500];
                                e.target.style.color = colors.grey[900];
                            }}
                        >
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

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    modalType === "edit"
                        ? "Editar Categoría"
                        : modalType === "delete"
                        ? "Eliminar Categoría"
                        : "Agregar Categoría"
                }
            >
                {modalType === "add" && <AddCategoryForm closeModal={closeModal} onSuccess={handleSuccess} />}
                {modalType === "edit" && (
                    <EditCategoryForm closeModal={closeModal} category={selectedCategory} onSuccess={handleSuccess} />
                )}
                {modalType === "delete" && (
                    <DeleteCategoryForm closeModal={closeModal} category={selectedCategory} onSuccess={handleSuccess} />
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} type={"admin"} />;

const AddCategoryForm = ({ closeModal, onSuccess }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const initialValues = {
        name: "",
    };

    const { data, errors, setData, post } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Categoría '${data.name}' agregada con éxito`);
            },
        });
    };

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
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>
            <PrimaryButton style={{ backgroundColor: colors.blueAccent[500], color: colors.grey[100] }}>
                Agregar Categoría
            </PrimaryButton>
        </form>
    );
};

const EditCategoryForm = ({ closeModal, category, onSuccess }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const initialValues = {
        name: category.name,
    };

    const { data, errors, setData, post } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.categories.update", category), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Categoría actualizada con éxito`);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <InputLabel htmlFor="name" value="Nombre" />
            <TextInput
                id="name"
                type="text"
                name="name"
                value={data.name}
                isFocused={true}
                className="mt-1 block w-full"
                onChange={(e) => setData("name", e.target.value)}
            />
            <InputError message={errors.name} className="mt-2" />
            <PrimaryButton style={{ backgroundColor: colors.greenAccent[500], color: colors.grey[100] }}>
                Guardar Cambios
            </PrimaryButton>
        </form>
    );
};

const DeleteCategoryForm = ({ closeModal, category, onSuccess }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { data, delete: destroy } = useForm({ name: category.name });

    const submit = (e) => {
        e.preventDefault();
        destroy(route("admin.categories.destroy", [category]), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Categoría '${category.name}' eliminada con éxito`);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Alert severity="warning">
                ¿Estás seguro de que deseas eliminar la categoría '{data.name}'?
            </Alert>
            <div className="flex justify-end space-x-2">
                <PrimaryButton
                    type="button"
                    onClick={closeModal}
                    style={{
                        backgroundColor: colors.grey[500],
                        color: colors.grey[100],
                    }}
                >
                    Cancelar
                </PrimaryButton>
                <PrimaryButton
                    style={{
                        backgroundColor: colors.redAccent[500],
                        color: colors.grey[100],
                    }}
                >
                    Eliminar
                </PrimaryButton>
            </div>
        </form>
    );
};

export { AddCategoryForm, EditCategoryForm, DeleteCategoryForm };
