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
        <div className="flex h-screen">
            <div className="w-1/2 bg-gray-100 flex items-center justify-center">
                <img
                    src={LoginImage}
                    alt="Login Illustration"
                    className="w-3/4 h-auto object-contain"
                />
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center px-10 bg-white">
                <h1 className="text-4xl font-bold text-blue-600 mb-2">
                    WELCOME BACK!
                </h1>
                <p className="text-gray-500 mb-8">
                    Enter your email and password
                </p>

                <form onSubmit={submit} className="w-full max-w-md space-y-6">
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
                                Remember me
                            </span>
                        </div>
                        <a
                            href={route("password.request")}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <div className="mt-6">
                        <PrimaryButton
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            Login
                        </PrimaryButton>
                    </div>
                <div className="mt-6 flex justify-end w-full">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <a
                            href={route("register")}
                            className="text-blue-600 hover:underline"
                        >
                            Register here
                        </a>
                    </p>
                </div>
                </form>


                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-500 text-sm">
                        or login with
                    </span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex justify-center w-full space-x-4">
                    <button className="flex justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition">
                        <img
                            src={GoogleImage}
                            alt="Google Icon"
                            className="w-5 h-5 mr-2"
                        />
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
