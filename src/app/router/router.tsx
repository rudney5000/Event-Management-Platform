import { createBrowserRouter } from "react-router";
import App from "../App";
import { HomePage } from "../../pages/home/HomePage";
import { LoginPage } from "../../pages/login/LoginPage";
import { RegisterPage } from "../../pages/register/RegisterPage";
import { PrivateRoute } from "../../shared/ui/PrivateRoute";
import { EventsPage } from "../../pages/admin/EventsPage";
import { DashboardPage } from "../../pages/admin/DashboardPage";
import { AdminLayout } from "../../widgets/admin-layout";

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