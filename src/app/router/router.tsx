import { createBrowserRouter } from "react-router";
import App from "../App";
import { HomePage } from "../../pages/home/HomePage";
import { LoginPage } from "../../pages/login/LoginPage";
import { RegisterPage } from "../../pages/register/RegisterPage";
import { PrivateRoute } from "../../shared/components/PrivateRoute";
import { EventsPage } from "../../pages/admin/EventsPage";
import { AdminLayout } from "../../widgets/admin";
import { DashboardPage } from "../../pages/admin/DashboardPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: "login",
                element: <LoginPage/>
            },
            {
                path: "register",
                element: <RegisterPage/>
            },
            {
                path: "admin",
                element: (
                    <PrivateRoute>
                      <AdminLayout />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardPage/>
                    },
                    {
                        path: "events",
                        element: <EventsPage/>
                    }
                ]
            },
        ]
    }
])