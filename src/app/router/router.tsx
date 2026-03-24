import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import { PrivateRoute } from "../../shared/ui/PrivateRoute";
import {
  EventsPage,
  DashboardPage,
  AdminEventPreviewPage,
  AdminCategoryPage,
  AdminCurrencyPage,
  AdminOrganizerPage,
  AdminCityPage,
} from "../../pages/admin";
import { AdminLayout } from "../../pages/admin/ui/ui/AdminLayout";
import { EventDetailsPage, EventPage } from "../../pages/customer";
import { LoginPage, RegisterPage } from "../../pages/auth";
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
              {
                path: "city",
                element: <AdminCityPage />,
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
