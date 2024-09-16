import { defaultAxios } from "@/api/axios.ts";

export interface RegisterUser {
  message: string;
  success: string;
}

export interface LoginUser {
  message: string;
  success: string;
  accessToken: string;
}

export const registerUser = async (
  userName: string,
  userPass: string,
): Promise<RegisterUser> => {
  const response = await defaultAxios.post("/register", {
    user_name: userName,
    user_pass: userPass,
  });
  return response.data;
};

export const loginUser = async (
  userName: string,
  userPass: string,
): Promise<LoginUser> => {
  const response = await defaultAxios.post(
    "/auth",
    {
      user_name: userName,
      user_pass: userPass,
    },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );
  return response.data;
};

export const logoutUser = async () => {
  await defaultAxios("/logout", {
    withCredentials: true,
  });
};
