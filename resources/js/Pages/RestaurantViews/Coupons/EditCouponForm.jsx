import {useForm} from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";

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

export default EditCouponForm;

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

export { CouponFormFields };
