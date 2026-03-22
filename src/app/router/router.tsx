import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import { PrivateRoute } from "../../shared/ui/PrivateRoute";
import { EventsPage } from "../../pages/admin";
import { DashboardPage } from "../../pages/admin";
import { AdminLayout } from "../../pages/admin/ui/ui/AdminLayout";
import { EventDetailsPage } from "../../pages/customer";
import { EventPage } from "../../pages/customer";
import { LoginPage } from "../../pages/auth";
import { RegisterPage } from "../../pages/auth";
import { AdminEventPreviewPage } from "../../pages/admin";
import { AdminCategoryPage } from "../../pages/admin";
import { AdminCurrencyPage } from "../../pages/admin";
import { AdminOrganizerPage } from "../../pages/admin";
import { LocaleLayout } from "./LocaleLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/fr" replace />,
  },
  {
    path: ":lang",
    element: <LocaleLayout />,
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <EventPage />,
          },
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
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
                index: true,
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: "dashboard",
                element: <DashboardPage />,
              },
              {
                path: "events",
                element: <EventsPage />,
              },
              {
                path: "events/preview/:id",
                element: <AdminEventPreviewPage />,
              },
              {
                path: "category",
                element: <AdminCategoryPage />,
              },
              {
                path: "currency",
                element: <AdminCurrencyPage />,
              },
              {
                path: "organizer",
                element: <AdminOrganizerPage />,
              },
            ],
          },
          {
            path: "event/:id",
            element: <EventDetailsPage />,
          },
        ],
      },
    ],
  },
]);
