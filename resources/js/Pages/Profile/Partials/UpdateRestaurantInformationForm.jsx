import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import {MenuItem, Select} from "@mui/material";
import RestaurantImage from "@/Components/RestaurantImage.jsx";

export default function UpdateRestaurantInformation({className = '', user, categories}) {

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.restaurant.name,
            category_id: user.restaurant.category_id,
            address: user.restaurant.address,
            image_url: user.restaurant.image_url,
            image: null,
            city: user.restaurant.city,
            state: user.restaurant.state,
            opening_time: user.restaurant.opening_time,
            close_time: user.restaurant.close_time,
            phone_number: user.phone_number,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route('profile.restaurant.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Información del Restaurante
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Actualiza la información básica de tu restaurante
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex-col">

                </div>
                <div>
                    <InputLabel htmlFor="name" value="Nombre"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name}/>
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
                        id="addres"
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
                    <RestaurantImage imagePath={data.image_url}/>
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

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Guardado
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
