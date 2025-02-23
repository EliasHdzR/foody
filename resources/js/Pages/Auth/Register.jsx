import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import RegisterImage from "../../../assets/RegisterImage.png";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        suburb: "",
        house_number: "",
        phone_number: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Crea tu cuenta" />

            <div className="flex h-screen bg-gray-50">
                <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 px-10">
                    <img
                        src={RegisterImage}
                        alt="Ilustración de Registro"
                        className="w-3/4 h-auto object-contain mb-6"
                    />
                    <h1 className="text-4xl font-bold text-blue-600">foody</h1>
                    <p className="text-gray-500 text-center mt-4">
                        Únete a la comunidad de amantes de la comida y descubre recetas
                        únicas y deliciosas.
                    </p>
                </div>

                <div className="w-1/2 flex flex-col items-center justify-center px-10 bg-white">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">
                        Crea tu cuenta
                    </h1>
                    <p className="text-gray-500 mb-8 text-center">
                        ¡Regístrate para empezar a explorar!
                    </p>

                    <form className="w-full max-w-md space-y-3" onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Nombre" />
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData("name", e.target.value)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Correo" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData("email", e.target.value)}
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="phone_number" value="Teléfono" />
                            <TextInput
                              id="phone_number"
                              type="text"
                              name="phone_number"
                              value={data.phone_number}
                              className="mt-1 block w-full"
                              autoComplete="phone_number"
                              onChange={(e) => setData("phone_number", e.target.value)}
                              required
                            />
                            <InputError message={errors.phone_number} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="address" value="Dirección" />
                            <TextInput
                              id="address"
                              type="text"
                              name="address"
                              value={data.address}
                              className="mt-1 block w-full"
                              autoComplete="address"
                              onChange={(e) => setData("address", e.target.value)}
                              required
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        <div className="flex flex-row items-start justify-between gap-2">
                            <div>
                                <InputLabel htmlFor="suburb" value="Colonia" />
                                <TextInput
                                  id="suburb"
                                  type="text"
                                  name="suburb"
                                  value={data.suburb}
                                  className="mt-1 block w-full"
                                  autoComplete="suburb"
                                  onChange={(e) => setData("suburb", e.target.value)}
                                  required
                                />
                                <InputError message={errors.suburb} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="house_number" value="Número Exterior" />
                                <TextInput
                                  id="house_number"
                                  type="text"
                                  name="house_number"
                                  value={data.house_number}
                                  className="mt-1 block w-full"
                                  autoComplete="house_number"
                                  onChange={(e) => setData("house_number", e.target.value)}
                                  required
                                />
                                <InputError message={errors.house_number} className="mt-2" />
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Contraseña" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData("password", e.target.value)}
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirmar Contraseña"
                            />
                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password_confirmation", e.target.value)
                                }
                                required
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <PrimaryButton
                                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all"
                                disabled={processing}
                            >
                                Inicia en foody
                            </PrimaryButton>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                ¿Ya tienes una cuenta?{" "}
                                <Link
                                    href={route("login")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Inicia sesión
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
