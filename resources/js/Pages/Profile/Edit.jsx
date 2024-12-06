import { useState } from 'react';
import Layout from '@/Layouts/Layout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateRestaurantInformationForm from './Partials/UpdateRestaurantInformationForm';
import UpdateDriverInformationForm from './Partials/UpdateDriverInformationForm.jsx';
import ConvertRoleForm from './Partials/ConvertRoleForm';

export default function Edit({ mustVerifyEmail, status, categories, user }) {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <Layout type={user.role}>
            <div className="bg-slate-800 w-full h-full text-white px-8 py-12 space-y-10">
                <div className="flex space-x-6 border-b border-slate-700">
                    <button
                        className={`py-2 px-4 transition-all duration-300 ${
                            activeTab === 'profile'
                                ? 'border-b-4 border-orange-500 text-orange-400 font-semibold'
                                : 'text-slate-300 hover:text-orange-400'
                        }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        Perfil
                    </button>
                    <button
                        className={`py-2 px-4 transition-all duration-300 ${
                            activeTab === 'password'
                                ? 'border-b-4 border-orange-500 text-orange-400 font-semibold'
                                : 'text-slate-300 hover:text-orange-400'
                        }`}
                        onClick={() => setActiveTab('password')}
                    >
                        Contraseña
                    </button>
                    {user.role === 'customer' && (
                        <button
                            className={`py-2 px-4 transition-all duration-300 ${
                                activeTab === 'role'
                                    ? 'border-b-4 border-orange-500 text-orange-400 font-semibold'
                                    : 'text-slate-300 hover:text-orange-400'
                            }`}
                            onClick={() => setActiveTab('role')}
                        >
                            Convertir Rol
                        </button>
                    )}
                    <button
                        className={`py-2 px-4 transition-all duration-300 ${
                            activeTab === 'delete'
                                ? 'border-b-4 border-red-500 text-red-400 font-semibold'
                                : 'text-slate-300 hover:text-red-400'
                        }`}
                        onClick={() => setActiveTab('delete')}
                    >
                        Eliminar Cuenta
                    </button>
                </div>

                <div className="mt-8">
                    {activeTab === 'profile' && (
                        <section>
                            <header className="mb-6">
                                <h2 className="text-2xl font-bold text-orange-400">
                                    Información del Perfil
                                </h2>
                                <p className="text-sm text-slate-300">
                                    Actualiza la información de tu perfil y el correo electrónico.
                                </p>
                            </header>
                            {user.role === 'restaurant' ? (
                                <UpdateRestaurantInformationForm
                                    user={user}
                                    categories={categories}
                                />
                            ) : user.role === 'driver' ? (
                                <UpdateDriverInformationForm user={user} />
                            ) : (
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            )}
                        </section>
                    )}

                    {activeTab === 'password' && (
                        <section>
                            <header className="mb-6">
                                <h2 className="text-2xl font-bold text-orange-400">
                                    Actualizar Contraseña
                                </h2>
                                <p className="text-sm text-slate-300">
                                    Cambia tu contraseña para mantener tu cuenta segura.
                                </p>
                            </header>
                            <UpdatePasswordForm />
                        </section>
                    )}

                    {activeTab === 'role' && user.role === 'customer' && (
                        <section>
                            <header className="mb-6">
                                <h2 className="text-2xl font-bold text-orange-400">
                                    Convertir Rol
                                </h2>
                                <p className="text-sm text-slate-300">
                                    Cambia tu rol a repartidor o restaurante.
                                </p>
                            </header>
                            <ConvertRoleForm categories={categories} />
                        </section>
                    )}

                    {activeTab === 'delete' && (
                        <section>
                            <header className="mb-6">
                                <h2 className="text-2xl font-bold text-red-400">
                                    Eliminar Cuenta
                                </h2>
                                <p className="text-sm text-slate-300">
                                    Borra tu cuenta de forma permanente. Esta acción no se puede deshacer.
                                </p>
                            </header>
                            <DeleteUserForm />
                        </section>
                    )}
                </div>
            </div>
        </Layout>
    );
}
