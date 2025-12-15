import { useAuthStore } from "../stores/authStore";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <header className="w-full bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 text-white px-6 py-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-xl font-semibold tracking-tight group-hover:text-blue-400 transition-colors">
                        Projecto
                    </span>
                </Link>

                {isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <span>Welcome, {user?.name || "Test user"}</span>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-sm rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="px-4 py-2 text-sm bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;