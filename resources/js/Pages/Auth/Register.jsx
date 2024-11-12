    import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Crea tu cuenta" />

            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex max-w-4xl p-6 bg-white shadow-lg rounded-lg w-full">
                    <div className="w-1/2 flex flex-col items-center justify-center p-8 border-r border-gray-200">
                        <ApplicationLogo className="w-32 h-32 mb-4" />
                        <h1 className="text-4xl font-bold text-blue-600">foody</h1>
                    </div>

                    <div className="w-1/2 p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crea tu cuenta</h2>
                        <p className="text-sm text-gray-500 mb-6">¡Únete a foody!</p>

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password" value="Contraseña" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <PrimaryButton className="w-full" disabled={processing}>
                                    Inicia en foody
                                </PrimaryButton>
                            </div>

                            <div className="mt-4 flex items-center justify-center">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                                >
                                    <img src="/google-logo.png" alt="G" className="w-5 h-5 mr-6" />
                                    Registrarte con Google
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    ¿Ya tienes una cuenta?{' '}
                                    <Link href={route('login')} className="text-blue-600 hover:underline">
                                        Inicia sesión
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
