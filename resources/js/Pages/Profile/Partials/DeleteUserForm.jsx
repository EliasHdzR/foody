import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <DangerButton
                className="bg-red-500 hover:bg-red-600 focus:ring-red-400 shadow-lg"
                onClick={confirmUserDeletion}
            >
                Eliminar Cuenta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8 bg-slate-800 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold text-orange-400">
                        ¿Estás seguro de eliminar tu cuenta?
                    </h2>
                    <p className="mt-4 text-sm text-gray-300">
                        Una vez eliminada tu cuenta, todos sus recursos y datos serán
                        permanentemente borrados. Por favor, ingresa tu contraseña para confirmar.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Contraseña" className="text-slate-400" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md text-gray-200 focus:ring-red-500 focus:border-red-500"
                            isFocused
                            placeholder="Ingresa tu contraseña"
                        />

                        <InputError message={errors.password} className="mt-2 text-red-400" />
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <SecondaryButton
                            className="bg-gray-200 hover:bg-gray-500 text-gray-200"
                            onClick={closeModal}
                        >
                            Cancelar
                        </SecondaryButton>

                        <DangerButton
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-400 ms-3 px-6 py-2 shadow-lg"
                            disabled={processing}
                        >
                            Eliminar Cuenta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
