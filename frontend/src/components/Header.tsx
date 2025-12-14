import { useAuthStore } from "../stores/authStore";

const Header = () => {
    const { isAuthenticated, user } = useAuthStore();


    return (
        <header className="w-screen bg-blue-700 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">PROJECTO</h1>

            {!isAuthenticated ? (
                <button
                    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white border hover:border-white"
                >
                    Login
                </button>
            ) : (
                <div className="flex items-center gap-2">
                    <span>{user?.name}</span>
                    <button
                        className="bg-gray-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
