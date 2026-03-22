import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store/store.ts";
import { Navigate } from "react-router";
import { useLocalizedPath } from "../hooks/useLocalizedPath";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const localizedPath = useLocalizedPath();

  if (!isAuthenticated) {
    return <Navigate to={localizedPath("/login")} replace />;
  }

  return children;
}