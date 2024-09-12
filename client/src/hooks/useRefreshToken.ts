import { useUserStore } from "@/store/user.tsx";
import { defaultAxios } from "@/api/axios.ts";

export const useRefreshToken = () => {
  const { login } = useUserStore((state) => state);

  return async () => {
    const response = await defaultAxios.get("/refresh", {
      withCredentials: true,
    });
    const accessToken: string = response.data.accessToken;
    if (accessToken) return login({ accessToken });
    return accessToken;
  };
};
