import React, { useState } from 'react';
import Layout from '@/Layouts/Layout.jsx';
import Modal from '@/Pages/RestaurantViews/Modal';
import { Alert, AlertTitle } from "@mui/material";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

const CouponsIndex = ({ coupons, restaurantID }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const openModal = (type, coupon = null) => {
        setModalType(type);
        setSelectedCoupon(coupon);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
        setSelectedCoupon(null);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const columns = [
        { id: 'code', label: 'Código', align: 'left' },
        { id: 'discount', label: 'Descuento ($)', align: 'right' },
        { id: 'discount_percent', label: 'Descuento (%)', align: 'right' },
        { id: 'expires_at', label: 'Fecha de Expiración', align: 'center' },
        { id: 'actions', label: '', align: 'center' },
    ];

    const rows = coupons.map((coupon) => ({
        id: coupon.id,
        code: coupon.code,
        discount: coupon.discount ? `$${Number(coupon.discount).toFixed(2)}` : '-',
        discount_percent: coupon.discount_percent ? `${Number(coupon.discount_percent).toFixed(2)}%` : '-',
        expires_at: coupon.expires_at,
        actions: [
            <button onClick={() => openModal('edit', coupon)} className="ml-4 px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
                Editar
            </button>,
            <button onClick={() => openModal('delete', coupon)} className="ml-4 px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
                Eliminar
            </button>,
        ],
    }));

    return (
        <div>
            {successMessage && (
                <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4">
                    <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                        <AlertTitle>Éxito</AlertTitle>
                        {successMessage}
                    </Alert>
                </div>
            )}
            <div className="container mx-auto">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Gestión de Cupones</h2>
                <div className="flex justify-end mb-2">
                    <button onClick={() => openModal('add')} className="ml-4 px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition">
                        Agregar
                    </button>
                </div>

                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.id} className="px-4 py-2 border-b">{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                {columns.map((col) => (
                                    <td key={col.id} className="px-4 py-2 border-b">
                                        {row[col.id] || row.actions}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'edit' ? 'Editar' : 'Agregar'}>
                <div className="max-h-[80vh] overflow-y-auto">
                    {modalType === 'add' && <AddCouponForm restaurantID={restaurantID} closeModal={closeModal} onSuccess={handleSuccess} />}
                    {modalType === 'edit' && <EditCouponForm coupon={selectedCoupon} closeModal={closeModal} onSuccess={handleSuccess} />}
                    {modalType === 'delete' && <DeleteCouponForm coupon={selectedCoupon} closeModal={closeModal} onSuccess={handleSuccess} />}
                </div>
            </Modal>
        </div>
    );
};

CouponsIndex.layout = (page) => <Layout children={page} type={'restaurant'} />;

export default CouponsIndex;

const AddCouponForm = ({ closeModal, onSuccess }) => {
    const { data, errors, setData, post } = useForm({
        code: "",
        discount: "",
        discount_percent: "",
        expires_at: "",
    });

    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("restaurante.coupons.store"), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Promoción '${data.code}' agregada con éxito`);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <CouponFormFields data={data} errors={errors} setData={setData} />
            <PrimaryButton>Agregar Promoción</PrimaryButton>
        </form>
    );
};

const EditCouponForm = ({ coupon, closeModal, onSuccess }) => {
    const { data, errors, setData, put } = useForm({
        code: coupon.code,
        discount: coupon.discount || "",
        discount_percent: coupon.discount_percent || "",
        expires_at: coupon.expires_at,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("restaurante.coupons.update", coupon.id), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Promoción '${data.code}' actualizada con éxito`);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <CouponFormFields data={data} errors={errors} setData={setData} />
            <PrimaryButton>Guardar Cambios</PrimaryButton>
        </form>
    );
};

const DeleteCouponForm = ({ coupon, closeModal, onSuccess }) => {
    const { delete: destroy } = useForm();

    const submit = (e) => {
        e.preventDefault();
        destroy(route("restaurante.coupons.destroy", coupon.id), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Promoción '${coupon.code}' eliminada con éxito`);
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Alert severity="warning">
                ¿Estás seguro de que deseas eliminar la promoción '{coupon.code}'?
            </Alert>
            <div className="flex justify-end space-x-2">
                <PrimaryButton type="button" onClick={closeModal}>
                    Cancelar
                </PrimaryButton>
                <PrimaryButton color="error">Eliminar</PrimaryButton>
            </div>
        </form>
    );
};

const CouponFormFields = ({ data, errors, setData }) => (
    <>
        <div>
            <InputLabel htmlFor="code" value="Código" />
            <TextInput
                id="code"
                type="text"
                name="code"
                value={data.code}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData("code", e.target.value)}
            />
            <InputError message={errors.code} className="mt-2" />
        </div>
        <div>
            <InputLabel htmlFor="discount" value="Descuento ($)" />
            <TextInput
                id="discount"
                type="number"
                name="discount"
                value={data.discount}
                className="mt-1 block w-full"
                onChange={(e) => setData("discount", e.target.value)}
            />
            <InputError message={errors.discount} className="mt-2" />
        </div>
        <div>
            <InputLabel htmlFor="discount_percent" value="Descuento (%)" />
            <TextInput
                id="discount_percent"
                type="number"
                name="discount_percent"
                value={data.discount_percent}
                className="mt-1 block w-full"
                onChange={(e) => setData("discount_percent", e.target.value)}
            />
            <InputError message={errors.discount_percent} className="mt-2" />
        </div>
        <div>
            <InputLabel htmlFor="expires_at" value="Fecha de Expiración" />
            <TextInput
                id="expires_at"
                type="datetime-local"
                name="expires_at"
                value={data.expires_at}
                className="mt-1 block w-full"
                onChange={(e) => setData("expires_at", e.target.value)}
            />
            <InputError message={errors.expires_at} className="mt-2" />
        </div>
    </>
);
