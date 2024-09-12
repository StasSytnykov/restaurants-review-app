import { useEffect, useState } from "react";
import { useRefreshToken } from "@/hooks/useRefreshToken.ts";
import { useUserStore } from "@/store/user.tsx";
import { Outlet } from "react-router-dom";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { persist, user } = useUserStore((state) => state);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !user?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(user?.accessToken)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};
