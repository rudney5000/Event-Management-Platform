import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store/store.ts";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}