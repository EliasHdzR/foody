import Layout from "@/Layouts/Layout.jsx";
import Tabla from '@/Components/Tabla.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import {useState} from 'react';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import {Alert, AlertTitle} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "@/theme";

export default function Index({ faqs }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
        { id: "question", label: "Pregunta", style: { color: colors.grey[100] } },
        { id: "answer", label: "Respuesta", style: { color: colors.grey[100] } },
        { id: "created_at", label: "Fecha de Creación", style: { color: colors.grey[100] } },
        { id: "updated_at", label: "Fecha de Modificación", style: { color: colors.grey[100] } },
        { id: "actions", label: "Acciones", align: "center", style: { color: colors.grey[100] } },
    ];

    const rows = faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
        created_at: faq.created_at,
        updated_at: faq.updated_at,
        actions: [
            <button
                onClick={() => openModal("edit", faq)}
                className="ml-4 px-4 py-2 rounded-lg font-semibold transition"
                style={{
                    backgroundColor: colors.greenAccent[500],
                    color: colors.grey[900],
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
                onClick={() => openModal("delete", faq)}
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
                    <Alert
                        severity="success"
                        style={{
                            backgroundColor: colors.greenAccent[400],
                            color: colors.grey[900],
                        }}
                        onClose={() => setSuccessMessage(null)}
                    >
                        <AlertTitle style={{ color: colors.grey[800] }}>Éxito</AlertTitle>
                        {successMessage}
                    </Alert>
                </div>
            )}

            <div
                className="w-full min-h-screen py-10 px-4"
                style={{ backgroundColor: colors.primary[700], color: colors.grey[100] }}
            >
                <div
                    className="w-full max-w-7xl mx-auto shadow-2xl rounded-lg p-10"
                    style={{
                        backgroundColor: colors.primary[400],
                        color: colors.grey[100],
                    }}
                >
                    <h2
                        className="text-4xl font-extrabold mb-10 text-center"
                        style={{ color: colors.greenAccent[500] }}
                    >
                        Preguntas Frecuentes
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

                    <Tabla columns={columns} rows={rows} rowsPerPageCustom={10} />
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    modalType === "edit"
                        ? "Editar Pregunta"
                        : modalType === "delete"
                        ? "Eliminar Pregunta"
                        : "Agregar Pregunta"
                }
            >
                {modalType === "add" && <AddFAQForm closeModal={closeModal} onSuccess={handleSuccess} />}
                {modalType === "edit" && (
                    <EditFAQForm closeModal={closeModal} faq={selectedFAQ} onSuccess={handleSuccess} />
                )}
                {modalType === "delete" && (
                    <DeleteFAQForm closeModal={closeModal} faq={selectedFAQ} onSuccess={handleSuccess} />
                )}
            </Modal>
        </div>
    );
}

Index.layout = (page) => <Layout children={page} type={"admin"} />;


const AddFAQForm = ({closeModal, onSuccess}) => {
    const {data, errors, setData, post} = useForm({
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
                <InputLabel htmlFor="question" value="Pregunta"/>
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
        console.log(faq);
        put(route('admin.faqs.update', faq), {
            onSuccess: () => {
                closeModal();
                onSuccess('Pregunta actualizada con éxito.');
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <InputLabel htmlFor="question" value="Pregunta"/>
                <TextInput
                    id="question"
                    type="text"
                    name="question"
                    value={data.question}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('question', e.target.value)}
                />
                <InputError message={errors.question} className="mt-2"/>
            </div>
            <div>
                <InputLabel htmlFor="answer" value="Respuesta"/>
                <TextInput
                    id="answer"
                    type="text"
                    name="answer"
                    value={data.answer}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('answer', e.target.value)}
                />
                <InputError message={errors.answer} className="mt-2"/>
            </div>
            <PrimaryButton>Guardar Cambios</PrimaryButton>
        </form>
    );
};

const DeleteFAQForm = ({closeModal, faq, onSuccess}) => {
    const {delete: destroy} = useForm();

    const submit = (e) => {
        e.preventDefault();
        destroy(route('admin.faqs.destroy', faq), {
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
