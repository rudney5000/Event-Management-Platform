import { createBrowserRouter } from "react-router";
import App from "../App";
import { PrivateRoute } from "../../shared/ui/PrivateRoute";
import { EventsPage } from "../../pages/admin/AdminEventsPage";
import { DashboardPage } from "../../pages/admin/DashboardPage";
import { AdminLayout } from "../../widgets/admin-layout";
import { EventDetailsPage } from "../../pages/customer/EventPageDetails";
import { EventPage } from "../../pages/customer/EventPage";
import { LoginPage } from "../../pages/account/login/LoginPage";
import { RegisterPage } from "../../pages/account/register/RegisterPage";
import { AdminEventPreviewPage } from "../../pages/admin/AdminEventPreviewPage";
import { AdminCategoryPage } from "../../pages/admin/AdminCategoryPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <EventPage/>
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
                    },
                    {
                        path: "events/preview/:id",
                        element: <AdminEventPreviewPage/>
                    },
                    {
                        path: "category",
                        element: <AdminCategoryPage/>
                    }
                ]
            },
            { 
                path: "event/:id", 
                element: <EventDetailsPage/> 
            }
        ]
    }
])