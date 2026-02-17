import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Navigate } from "react-router";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuth = useSelector((state: RootState) => state.auth.token);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}