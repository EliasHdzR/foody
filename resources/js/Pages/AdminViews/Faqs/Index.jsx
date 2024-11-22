import Layout from "@/Layouts/Layout.jsx";
import Tabla from '@/Components/Tabla.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import { useState } from 'react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Alert, AlertTitle } from "@mui/material";

export default function Index({ faqs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedFAQ, setSelectedFAQ] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (type, faq = null) => {
        setModalType(type);
        setSelectedFAQ(faq);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedFAQ(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const columns = [
        { id: 'question', label: 'Pregunta' },
        { id: 'answer', label: 'Respuesta' },
        { id: 'created_at', label:'Fecha de creacion'},
        { id: 'updated_at', label:'Fecha de modificacion'},
        { id: 'actions', label: 'Acciones', align: 'center' }
    ];

    const rows = faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
        created_at: faq.created_at,
        updated_at: faq.updated_at,
        actions: [
            <button onClick={() => openModal('edit', faq)}
                className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                Editar
            </button>,
            <button onClick={() => openModal('delete', faq)}
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
                        <AlertTitle>Éxito</AlertTitle>
                        {successMessage}
                    </Alert>
                </div>
            )}
            <div className="flex w-full bg-gray-100 min-h-screen py-10 px-4">
                <div className="w-full max-w-7xl mx-auto bg-white shadow-2xl rounded-lg p-10">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Preguntas Frecuentes</h2>
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

            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'edit' ? "Editar Pregunta" : modalType === 'delete' ? "Eliminar Pregunta" : "Agregar Pregunta"}>
                {modalType === 'add' && <AddFAQForm closeModal={closeModal} onSuccess={handleSuccess} />}
                {modalType === 'edit' && <EditFAQForm closeModal={closeModal} faq={selectedFAQ} onSuccess={handleSuccess} />}
                {modalType === 'delete' && <DeleteFAQForm closeModal={closeModal} faq={selectedFAQ} onSuccess={handleSuccess} />}
            </Modal>
        </Layout>
    );
}

const AddFAQForm = ({ closeModal, onSuccess }) => {
    const { data, errors, setData, post } = useForm({
        question: "",
        answer: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.faqs.store'), {
            onSuccess: () => {
                closeModal();
                onSuccess('Pregunta agregada con éxito.');
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <InputLabel htmlFor="question" value="Pregunta" />
                <TextInput
                    id="question"
                    type="text"
                    name="question"
                    value={data.question}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('question', e.target.value)}
                />
                <InputError message={errors.question} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="answer" value="Respuesta" />
                <TextInput
                    id="answer"
                    type="text"
                    name="answer"
                    value={data.answer}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('answer', e.target.value)}
                />
                <InputError message={errors.answer} className="mt-2" />
            </div>
            <PrimaryButton>Agregar</PrimaryButton>
        </form>
    );
};

const EditFAQForm = ({ closeModal, faq, onSuccess }) => {
    const { data, errors, setData, put } = useForm({
        question: faq.question,
        answer: faq.answer,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.faqs.update', faq.id), {
            onSuccess: () => {
                closeModal();
                onSuccess('Pregunta actualizada con éxito.');
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <InputLabel htmlFor="question" value="Pregunta" />
                <TextInput
                    id="question"
                    type="text"
                    name="question"
                    value={data.question}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('question', e.target.value)}
                />
                <InputError message={errors.question} className="mt-2" />
            </div>
            <div>
                <InputLabel htmlFor="answer" value="Respuesta" />
                <TextInput
                    id="answer"
                    type="text"
                    name="answer"
                    value={data.answer}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('answer', e.target.value)}
                />
                <InputError message={errors.answer} className="mt-2" />
            </div>
            <PrimaryButton>Guardar Cambios</PrimaryButton>
        </form>
    );
};

const DeleteFAQForm = ({ closeModal, faq, onSuccess }) => {
    const { delete: destroy } = useForm();

    const submit = (e) => {
        e.preventDefault();
        destroy(route('admin.faqs.destroy', faq.id), {
            onSuccess: () => {
                closeModal();
                onSuccess('Pregunta eliminada con éxito.');
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Alert severity="warning">¿Estás seguro de que deseas eliminar esta pregunta?</Alert>
            <div className="flex justify-end space-x-2">
                <PrimaryButton type="button" onClick={closeModal}>Cancelar</PrimaryButton>
                <PrimaryButton color="error">Eliminar</PrimaryButton>
            </div>
        </form>
    );
};
