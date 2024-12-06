import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            phone_number: user.phone_number ?? "",
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={`bg-slate-700 p-6 rounded-lg shadow-md ${className}`}>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" className="text-slate-300" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md text-gray-200 focus:ring-orange-400 focus:border-orange-400"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Número de Teléfono" className="text-slate-300" />
                    <TextInput
                        id="phone_number"
                        className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md text-gray-200 focus:ring-orange-400 focus:border-orange-400"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        autoComplete="phone_number"
                    />
                    <InputError className="mt-2" message={errors.phone_number} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" className="text-slate-300" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md text-gray-200 focus:ring-orange-400 focus:border-orange-400"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="mt-4 p-4 bg-slate-800 border-l-4 border-orange-400 rounded-md">
                        <p className="text-sm text-gray-300">
                            Tu correo electrónico no ha sido verificado.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="text-orange-400 underline hover:text-orange-500"
                            >
                                Haz click aquí para enviar un link de verificación
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-green-500">
                                Un nuevo link de verificación ha sido enviado a tu correo electrónico.
                            </p>
                        )}
                    </div>
                )}

                <div className="flex items-center">
                    <PrimaryButton
                        className="bg-orange-500 hover:bg-orange-600 focus:ring-orange-400"
                        disabled={processing}
                    >
                        Guardar
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition-opacity duration-300"
                        enterFrom="opacity-0"
                        leave="transition-opacity duration-300"
                        leaveTo="opacity-0"
                        className="ml-4"
                    >
                        <p className="text-sm text-green-400">Guardado con éxito.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
