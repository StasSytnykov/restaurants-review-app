import { useUserStore } from "@/store/user.tsx";
import { defaultAxios } from "@/api/axios.ts";

export const useRefreshToken = () => {
  const { login, user } = useUserStore((state) => state);

  return async () => {
    const response = await defaultAxios.get("/refresh", {
      withCredentials: true,
    });
    const accessToken = response.data.accessToken;
    if (accessToken && user) return login({ ...user, accessToken });
    return accessToken;
  };
};
