import { useState } from "react";
import { useForm } from "@inertiajs/react";
import ToggleOff from "../../../svg/ToggleOff";
import ToggleOn from "../../../svg/ToggleOn";
import LoginImage from "../../../assets/LoginImage.png";
import GoogleImage from "../../../assets/Google.png";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

const Login = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleToggle = () => {
        setData("remember", !data.remember);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <img
                    src={LoginImage}
                    alt="Ilustración de Inicio de Sesión"
                    className="w-3/4 h-auto object-contain"
                />
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center px-12 bg-white shadow-lg">
                <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
                    ¡BIENVENIDO DE NUEVO!
                </h1>
                <p className="text-gray-500 mb-10 text-center">
                    Ingresa tu correo y contraseña para iniciar sesión
                </p>

                <form onSubmit={submit} className="w-full max-w-md space-y-6 text-gray-900">
                    <div>
                        <InputLabel htmlFor="email" value="Correo" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                            <div
                                className="cursor-pointer"
                                onClick={handleToggle}
                            >
                                {data.remember ? <ToggleOn /> : <ToggleOff />}
                            </div>
                            <span className="text-sm text-gray-900">
                                Recordarme
                            </span>
                        </div>
                        <a
                            href={route("password.request")}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>

                    <div className="mt-6">
                        <PrimaryButton
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 shadow-lg transition-all"
                            disabled={processing}
                        >
                            Iniciar sesión
                        </PrimaryButton>
                    </div>

                    <div className="mt-6 text-right">
                        <p className="text-gray-600 text-sm">
                            ¿No tienes una cuenta?{" "}
                            <a
                                href={route("register")}
                                className="text-blue-600 hover:underline"
                            >
                                Regístrate aquí
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
