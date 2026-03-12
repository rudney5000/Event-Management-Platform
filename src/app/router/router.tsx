import { createBrowserRouter } from "react-router";
import App from "../App";
import { PrivateRoute } from "../../shared/ui/PrivateRoute";
import { EventsPage } from "../../segments/admin";
import { DashboardPage } from "../../segments/admin";
import { AdminLayout } from "../../segments/admin/ui/ui/AdminLayout";
import { EventDetailsPage } from "../../segments/customer";
import { EventPage } from "../../segments/customer";
import { LoginPage } from "../../segments/auth";
import { RegisterPage } from "../../segments/auth";
import { AdminEventPreviewPage } from "../../segments/admin";
import { AdminCategoryPage } from "../../segments/admin";
import { AdminCurrencyPage } from "../../segments/admin";
import { AdminOrganizerPage } from "../../segments/admin";

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
                    },
                    {
                        path: "currency",
                        element: <AdminCurrencyPage/>
                    },
                    {
                        path: "organizer",
                        element: <AdminOrganizerPage/>
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