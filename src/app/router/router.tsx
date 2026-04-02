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
} from "../../pages";
import { AdminLayout } from "../../pages/admin/ui";
import { EventDetailsPage, EventPage, AboutPage } from "../../pages";
import { LoginPage, RegisterPage } from "../../pages";
import { LocaleLayout } from "./LocaleLayout";
import {EventFavoritesPage} from "../../pages";

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
          {
            path: "event/favorites",
            element: <EventFavoritesPage/>
          },
          {
            path: "about",
            element: <AboutPage/>
          }
        ],
      },
    ],
  },
]);
