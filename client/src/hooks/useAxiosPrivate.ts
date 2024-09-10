import { useRefreshToken } from "@/hooks/useRefreshToken.ts";
import { useUserStore } from "@/store/user.tsx";
import { useEffect } from "react";
import { privateAxios } from "@/api/axios.ts";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { login, user } = useUserStore((state) => state);

  useEffect(() => {
    const requestIntercept = privateAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = privateAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return privateAxios(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      privateAxios.interceptors.response.eject(responseIntercept);
      privateAxios.interceptors.request.eject(requestIntercept);
    };
  }, [login, refresh]);

  return privateAxios;
};
