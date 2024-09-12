import { useUserStore } from "@/store/user.tsx";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/api/authApi.ts";

export const useLogout = () => {
  const { logout } = useUserStore((state) => state);
  const navigate = useNavigate();

  return async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    } finally {
      logout();
      navigate("/");
    }
  };
};
