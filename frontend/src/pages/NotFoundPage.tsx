import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-screen p-6 bg-zinc-950">
            <div className="text-center space-y-6">
                <div className="space-y-2">
                    <h1 className="text-8xl font-bold text-zinc-600">404</h1>
                    <h2 className="text-2xl font-semibold text-white">Page Not Found</h2>
                    <p className="text-zinc-300 max-w-md">
                        The page you're looking for doesn't exist.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                        <FaHome className="w-4 h-4" />
                        Back to Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-sm rounded-lg bg-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;