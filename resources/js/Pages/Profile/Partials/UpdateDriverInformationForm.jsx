import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import {MenuItem, Select} from "@mui/material";

export default function UpdateProfileInformation({className = '', user}) {

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            phone_number: user.phone_number,
            shift_start: user.driver.shift_start,
            shift_end: user.driver.shift_end,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.driver.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Información del Repartidor
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Actualiza la información básica de tu perfil de repartidor
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name}/>
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
