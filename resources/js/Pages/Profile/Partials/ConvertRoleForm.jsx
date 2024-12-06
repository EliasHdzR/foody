import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import MopedIcon from '@mui/icons-material/Moped';
import StoreIcon from '@mui/icons-material/Store';
import Modal from "@/Pages/RestaurantViews/Modal.jsx";
import { useState } from "react";
import { MenuItem, Select } from "@mui/material";
export default function ConvertRoleForm({ className = '', categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const openModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalType(null);
    };

    const user = usePage().props.auth.user;

    return (
        <section className={`bg-slate-800 p-8 rounded-lg shadow-md border border-slate-700 ${className}`}>
            <div className="border border-slate-700 rounded-md p-6 bg-slate-700 shadow-md">
                <div className="grid grid-cols-2 gap-8">
                    <div className=" rounded-lg text-center shadow-lg">
                        <PrimaryButton
                            className="w-50px h-auto aspect-square flex flex-col items-center justify-center gap-4 bg-orange-500 hover:bg-orange-600 focus:ring-orange-400 rounded-lg shadow-lg"
                            onClick={() => openModal('driver')}
                        >
                            <MopedIcon style={{ fontSize: 100 }} />
                            <span className="text-xl font-bold">¡Conviértete en Repartidor!</span>
                        </PrimaryButton>
                    </div>

                    <div className="rounded-lg  text-center shadow-lg">
                        <PrimaryButton
                            className="w-50px h-auto aspect-square flex flex-col items-center justify-center gap-4 bg-orange-500 hover:bg-orange-600 focus:ring-orange-400 rounded-lg shadow-lg"
                            onClick={() => openModal('restaurant')}
                        >
                            <StoreIcon style={{ fontSize: 100 }} />
                            <span className="text-xl font-bold">¡Conviértete en Restaurante!</span>
                        </PrimaryButton>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalType === 'driver' ? "Convertirse en Repartidor" : "Convertirse en Restaurante"}
            >
                <div className="p-6 bg-slate-800 rounded-md shadow-md max-h-[80vh] overflow-y-auto">
                    {modalType === 'driver' && <DriverForm user={user} />}
                    {modalType === 'restaurant' && <RestaurantForm user={user} categories={categories} />}
                </div>
            </Modal>
        </section>
    );
}

const DriverForm = ({ user }) => {
    const initialValues = {
        user_id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        shift_start: "",
        shift_end: "",
    };

    const { data, errors, setData, post } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.toDriver'));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <Field
                label="Nombre"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled
            />
            <Field
                label="Correo Electrónico"
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                disabled
            />
            <Field
                label="Número de Teléfono"
                id="phone_number"
                value={data.phone_number}
                onChange={(e) => setData('phone_number', e.target.value)}
                error={errors.phone_number}
            />
            <Field
                label="Inicio de Turno"
                id="shift_start"
                type="time"
                value={data.shift_start}
                onChange={(e) => setData('shift_start', e.target.value)}
                error={errors.shift_start}
            />
            <Field
                label="Fin de Turno"
                id="shift_end"
                type="time"
                value={data.shift_end}
                onChange={(e) => setData('shift_end', e.target.value)}
                error={errors.shift_end}
            />
            <div className="flex justify-end">
                <PrimaryButton>Confirmar</PrimaryButton>
            </div>
        </form>
    );
};

const RestaurantForm = ({ user, categories }) => {
    const initialValues = {
        name: "",
        category_id: "",
        user_id: user.id,
        phone_number: user.phone_number,
        address: "",
        city: "",
        state: "",
        opening_time: "",
        close_time: "",
    };

    const { data, errors, setData, post } = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.toRestaurant'));
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <Field
                label="Nombre del Restaurante"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
            />
            <div>
                <InputLabel htmlFor="category_id" value="Categoría" className="text-slate-300" />
                <Select
                    id="category_id"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md text-gray-200 focus:ring-orange-400 focus:border-orange-400"
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                <InputError message={errors.category_id} />
            </div>
            <Field
                label="Número de Teléfono"
                id="phone_number"
                value={data.phone_number}
                onChange={(e) => setData('phone_number', e.target.value)}
                error={errors.phone_number}
            />
            <Field
                label="Ciudad"
                id="city"
                value={data.city}
                onChange={(e) => setData('city', e.target.value)}
                error={errors.city}
            />
            <Field
                label="Estado"
                id="state"
                value={data.state}
                onChange={(e) => setData('state', e.target.value)}
                error={errors.state}
            />
            <Field
                label="Dirección"
                id="address"
                value={data.address}
                onChange={(e) => setData('address', e.target.value)}
                error={errors.address}
            />
            <Field
                label="Hora de Apertura"
                id="opening_time"
                type="time"
                value={data.opening_time}
                onChange={(e) => setData('opening_time', e.target.value)}
                error={errors.opening_time}
            />
            <Field
                label="Hora de Cierre"
                id="close_time"
                type="time"
                value={data.close_time}
                onChange={(e) => setData('close_time', e.target.value)}
                error={errors.close_time}
            />
            <div className="flex justify-end">
                <PrimaryButton>Confirmar</PrimaryButton>
            </div>
        </form>
    );
};

const Field = ({ label, id, type = "text", value, onChange, error, disabled = false }) => (
    <div>
        <InputLabel htmlFor={id} value={label} className="text-slate-300" />
        <TextInput
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md text-gray-200 focus:ring-orange-400 focus:border-orange-400 ${
                disabled ? "opacity-70 cursor-not-allowed" : ""
            }`}
        />
        {error && <InputError message={error} />}
    </div>
);
