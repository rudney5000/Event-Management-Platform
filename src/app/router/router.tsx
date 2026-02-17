import { createBrowserRouter } from "react-router";
import App from "../App";
import { HomePage } from "../../pages/home/HomePage";
import { LoginPage } from "../../pages/login/LoginPage";
import { RegisterPage } from "../../pages/register/RegisterPage";
import { AdminPage } from "../../pages/admin/AdminPage";
import { PrivateRoute } from "../../shared/components/PrivateRoute";

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
                      <AdminPage />
                    </PrivateRoute>
                ),
            },
        ]
    }
])