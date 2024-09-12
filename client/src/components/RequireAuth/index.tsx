import { useUserStore } from "@/store/user.tsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();
  return user?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};
