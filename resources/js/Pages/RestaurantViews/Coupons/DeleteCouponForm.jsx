import {useForm} from "@inertiajs/react";
import {Alert} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";

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

export default DeleteCouponForm;
