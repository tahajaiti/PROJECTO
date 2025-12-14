import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const AuthLayout = () => {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <Outlet />
        </div>
    );
};

export default AuthLayout;