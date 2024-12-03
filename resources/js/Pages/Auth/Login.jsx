import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inicia sesión" />
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex max-w-3xl p-6 bg-white shadow-lg rounded-lg w-full">
                    <div className="w-1/2 flex flex-col items-center justify-center p-8 border-r border-gray-200">
                        <ApplicationLogo className="w-32 h-32 mb-4" />
                        <h1 className="text-4xl font-bold text-blue-600">foody</h1>
                    </div>

                    <div className="w-1/2 p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inicia sesión</h2>
                        <p className="text-sm text-gray-500 mb-6">¡Bienvenido de nuevo!</p>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit}>
                            <div className='text-neutral-950'>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-4 text-neutral-950">
                                <InputLabel htmlFor="password" value="Contraseña" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Recordar por 30 días</span>
                                </label>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Olvidé mi contraseña
                                    </Link>
                                )}
                            </div>

                            <div className="mt-4">
                                <PrimaryButton className="w-full" disabled={processing}>
                                    Iniciar sesión
                                </PrimaryButton>
                            </div>

                            <div className="mt-4 flex items-center justify-center">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                                >
                                    <img src="/path/to/google-logo.png" alt="L" className="w-5 h-5 mr-2" />
                                    Registrarte con Google
                                </button>
                            </div>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-600">
                                    ¿No tienes una cuenta?{' '}
                                    <Link href={route('register')} className="text-blue-600 hover:underline">
                                        Regístrate
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
