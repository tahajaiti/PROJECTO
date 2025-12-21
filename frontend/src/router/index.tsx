import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../layouts/AppLayout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RootLayout from "../layouts/RootLayout";
import ProjectPage from "../pages/ProjectPage";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                element: <AuthLayout />, // auth routes
                children: [
                    { path: "/login", element: <LoginPage /> },
                ],
            },

            {
                element: <ProtectedRoute />,
                children: [
                    {
                        element: <AppLayout />, // main routes
                        children: [
                            { path: "/", element: <HomePage /> },
                            { path: "/projects/:id", element: <ProjectPage /> },
                        ],
                    },
                ],
            },

            { path: "*", element: <NotFoundPage /> },
        ],
    },
])
