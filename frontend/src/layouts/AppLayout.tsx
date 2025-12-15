import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const AppLayout = () => {

    return (
        <div className="min-h-screen min-w-screen bg-zinc-950">
            <Header />

            <main className="w-full h-full">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;