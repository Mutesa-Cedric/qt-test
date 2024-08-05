import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import useAuth from "../hooks/useAuth";

export default function Register() {
    const { register, registering } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const name = form.fullName.value;
        const email = form.email.value;
        const password = form.password.value;
        const repeatPassword = form.repeatPassword.value;
        if (password !== repeatPassword) {
            notifications.show({
                title: "Error",
                message: "Passwords do not match",
                color: "red",
            });
            return;
        }
        register(name, email, password);
    }

    return (
        <>
            <Helmet>
                <title>Create account</title>
            </Helmet>
            <div className="w-full h-screen bg-gray-100 flex items-center justify-center">

                <div className="mx-auto w-full max-w-md lg:w-[28rem] bg-white rounded-md shadow p-6 flex flex-col items-center">
                    <div>
                        <Link to={'/'}>
                            <p className="font-semibold text-lg text-gray-600  text-center">&larr;  Go back</p>
                        </Link>
                        <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            create an account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Already have an account{' '}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10 w-full">
                        <div className="w-full">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6">
                                <AuthInput
                                    label="Full Name"
                                    required
                                    type="text"
                                    name="fullName"
                                    min={2} max={50}
                                />

                                <AuthInput
                                    label="Email Address"
                                    required
                                    autoComplete="email"
                                    type="email"
                                    name="email"
                                />

                                <AuthInput
                                    label="Password"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                    name="password"
                                    min={4} max={50}
                                />
                                <AuthInput
                                    label="Repeat Password"
                                    required
                                    autoComplete="current-password"
                                    type="password"
                                    name="repeatPassword"
                                    min={4} max={50}
                                />

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        loading={registering}
                                    >
                                        Create account
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
