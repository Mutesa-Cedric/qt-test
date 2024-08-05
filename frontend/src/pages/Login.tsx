import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import useAuth from "../hooks/useAuth";
import { generatePageTitle } from "../lib/utils";

export default function Login() {
    const { loggingIn, login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const email = form.email.value;
        const password = form.password.value;
        if (!email || !password) {
            notifications.show({
                title: "Error",
                message: "Please fill in all fields",
                color: "red",
            });
            return;
        }
        login(email, password);
    }

    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Login")}</title>
            </Helmet>
            <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
                <div className="mx-auto w-full max-w-sm lg:w-96 bg-white rounded-md shadow p-6 flex flex-col items-center">
                    <div>
                        <Link to={'/'}>
                            <p className="font-semibold text-lg text-gray-600  text-center">&larr;  Go back</p>
                        </Link>
                        <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Not a member?{' '}
                            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-10 w-full">
                        <div className="w-full">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 w-full">
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

                                />

                                <div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        loading={loggingIn}
                                    >
                                        Sign in
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
