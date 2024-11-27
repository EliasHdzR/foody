import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";
import {CouponFormFields} from "@/Pages/RestaurantViews/Coupons/EditCouponForm.jsx";


const AddCouponForm = ({ closeModal, onSuccess }) => {
    const { data, errors, setData, post } = useForm({
        code: "",
        discount: "",
        discount_percent: "",
        expires_at: "",
    });

    const submit = (e) => {
        e.preventDefault();
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

export default AddCouponForm;
