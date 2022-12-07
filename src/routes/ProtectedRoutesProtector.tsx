import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";
import { ROUTES } from "./ApplicationRoutes";

export function ProtectedRoutesProtector({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) return children;

  return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
}
