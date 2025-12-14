import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { path: "/login", element: <LoginPage /> },
        ],
    },

    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    { path: "/", element: <HomePage /> },
                ],
            },
        ],
    },
]);