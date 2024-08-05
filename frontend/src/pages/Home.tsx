import { Helmet } from "react-helmet";
import useAuth from "../hooks/useAuth";
import { generatePageTitle } from "../lib/utils";

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <Helmet>
                <title>{generatePageTitle("Welcome")}</title>
            </Helmet>
            <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">

            </main>
        </>
    )
}
