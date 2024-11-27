import {useForm} from "@inertiajs/react";
import {Alert} from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";

const DeleteProductForm = ({closeModal, product, onSuccess}) => {
    const {delete: destroy} = useForm();

    const submit = (e) => {
        e.preventDefault();
        destroy(route('restaurante.products.destroy', product), {
            onSuccess: () => {
                closeModal();
                onSuccess(`Producto '${product.name}' eliminado con éxito`);
            },
        });
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <Alert severity="warning">¿Estás seguro de que deseas eliminar el producto '{product.name}'?</Alert>
            <div className="flex justify-end space-x-2">
                <PrimaryButton type="button" onClick={closeModal}>Cancelar</PrimaryButton>
                <PrimaryButton color="error">Eliminar</PrimaryButton>
            </div>
        </form>
    );
};

export default DeleteProductForm;
