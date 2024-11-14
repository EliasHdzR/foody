import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {useForm, usePage} from '@inertiajs/react';
import MopedIcon from '@mui/icons-material/Moped';
import StoreIcon from '@mui/icons-material/Store';
import Modal from "@/Pages/RestaurantViews/Modal.jsx";
import {useState} from "react";
import {MenuItem, Select} from "@mui/material";

export default function ConvertRoleForm({className = '', categories}) {
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
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Configuración de Perfil
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Actualiza tu información y forma parte del servicio de Foody
                </p>
            </header>

            <div className="mt-6 flex items-center">
                <div className='mr-3'>
                    <PrimaryButton className="flex-col" onClick={() => openModal('driver', user)}>
                        <MopedIcon style={{fontSize: 80}}/>
                        Convertirse en Repartidor
                    </PrimaryButton>
                </div>
                <div>
                    <PrimaryButton className="flex-col" onClick={() => openModal('restaurant', user)}>
                        <StoreIcon style={{fontSize: 80}}/>
                        Convertirse en Restaurante
                    </PrimaryButton>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={modalType === 'driver' ? "Convertirse en Repartidor" : "Convertirse en Restaurante"}>
                <div className="max-h-[80vh] overflow-y-auto">
                    {modalType === 'driver' && <DriverForm user={user} />}
                    {modalType === 'restaurant' && <RestaurantForm user={user} categories={categories}/>}
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
    }

    return (
        <form onSubmit={submit} className="space-y-4">
            <div>
                <InputLabel htmlFor="name" value="Nombre"/>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full bg-gray-200"
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={true}
                />
            </div>

            <div>
                <InputLabel htmlFor="email" value="Correo Electrónico"/>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full bg-gray-200"
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={true}
                />
            </div>

            <div>
                <InputLabel htmlFor="phone_number" value="Número de Teléfono"/>
                <TextInput
                    id="phone_number"
                    type="text"
                    name="phone_numer"
                    value={data.phone_number}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('phone_number', e.target.value)}
                />
                <InputError message={errors.phone_number} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="shift_start" value="Inicio de Turno"/>
                <TextInput
                    id="shift_start"
                    type="time"
                    name="shift_start"
                    value={data.shift_start}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('shift_start', e.target.value)}
                />
                <InputError message={errors.shift_start} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="shift_end" value="Fin de Turno"/>
                <TextInput
                    id="shift_end"
                    type="time"
                    name="shift_end"
                    value={data.shift_end}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('shift_end', e.target.value)}
                />
                <InputError message={errors.shift_end} className="mt-2"/>
            </div>

            <PrimaryButton>Confirmar</PrimaryButton>
        </form>
    );
};

const RestaurantForm = ({user, categories}) => {
    const initialValues = {
        name: "",
        image: null,
        category_id: "",
        user_id: user.id,
        phone_number: user.phone_number,
        address: "",
        city: "",
        state: "",
        opening_time: "",
        close_time: "",
    };

    const {data, errors, setData, post} = useForm(initialValues);

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.toRestaurant'));
    }

    return (
        <form onSubmit={submit} className="space-y-4 overflow-scroll">
            <div>
                <InputLabel htmlFor="name" value="Nombre del Restaurante"/>
                <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    isFocused={true}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="category_id" value="Categoría"/>
                <Select
                    id="category_id"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    className="mt-1 block w-full"
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
                <InputError message={errors.category_id} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="phone_number" value="Número de Teléfono"/>
                <TextInput
                    id="phone_number"
                    type="text"
                    name="phone_number"
                    value={data.phone_number}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('phone_number', e.target.value)}
                />
                <InputError message={errors.phone_number} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="city" value="Ciudad"/>
                <TextInput
                    id="city"
                    type="text"
                    name="city"
                    value={data.city}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('city', e.target.value)}
                />
                <InputError message={errors.city} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="state" value="Estado"/>
                <TextInput
                    id="state"
                    type="text"
                    name="state"
                    value={data.state}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('state', e.target.value)}
                />
                <InputError message={errors.state} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="address" value="Dirección"/>
                <TextInput
                    id="address"
                    type="text"
                    name="address"
                    value={data.address}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('address', e.target.value)}
                />
                <InputError message={errors.address} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="opening_time" value="Hora de Apertura"/>
                <TextInput
                    id="opening_time"
                    type="time"
                    name="opening_time"
                    value={data.opening_time}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('opening_time', e.target.value)}
                />
                <InputError message={errors.opening_time} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="close_time" value="Hora de Cierre"/>
                <TextInput
                    id="close_time"
                    type="time"
                    name="close_time"
                    value={data.close_time}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('close_time', e.target.value)}
                />
                <InputError message={errors.close_time} className="mt-2"/>
            </div>

            <div>
                <InputLabel htmlFor="image" value="Imagen (Opcional)"/>
                <TextInput
                    id="image"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2"/>
            </div>

            <PrimaryButton>Confirmar</PrimaryButton>
        </form>
    );
};
