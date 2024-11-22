import Layout from "@/Layouts/Layout.jsx";
import Tabla from '@/Components/Tabla.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import { useState } from 'react';
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Alert, AlertTitle } from "@mui/material";
import Dashboard from "@/Pages/RestaurantViews/Dashboard.jsx";

export default function Index({ customers }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedcustomer, setSelectedcustomer] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (type, customer = null) => {
        setModalType(type);
        setSelectedcustomer(customer);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedcustomer(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const columns = [
        { id: 'user_name', label: 'Nombre' },
        { id: 'email', label: 'Email'},
        { id: 'phone_number', label: 'Telefono'},
        { id: 'actions', label: 'Acciones', align: 'center' }
    ];

    const rows = customers.map((customer) => ({
        user_name: customer.user_name,
        email: customer.email,
        phone_number: customer.phone_number,
        actions: (
            <button onClick={() => openModal('delete', customer)}
                className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                Eliminar
            </button>
        )
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
            <div className="flex w-full bg-gray-100 min-h-screen py-10 px-4">
                <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Clientes</h2>

                    <Tabla
                        columns={columns}
                        rows={rows}
                        rowsPerPageCustom={10}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title="Eliminar Repartidor">
                {modalType === 'delete' && (
                    <DeletecustomerForm closeModal={closeModal} customer={selectedcustomer} onSuccess={handleSuccess} />
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} type={'admin'}/>;

const DeletecustomerForm = ({ closeModal, customer, onSuccess }) => {
    const { delete: destroy } = useForm();

    const submit = (e) => {
        e.preventDefault();
        destroy(route('admin.customers.destroy', customer.id), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Cliente '${customer.user_name}' eliminado con éxito`);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Alert severity="warning">¿Estás seguro de que deseas eliminar al usuario '{customer.user_name}'?</Alert>
            <div className="flex justify-end space-x-2">
                <PrimaryButton type="button" onClick={closeModal}>Cancelar</PrimaryButton>
                <PrimaryButton color="error">Eliminar</PrimaryButton>
            </div>
        </form>
    );
};
