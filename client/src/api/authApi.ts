import axiosDefault from "@/api/axiosDefault.ts";

interface RegisterUser {
  message: string;
  success: string;
}

export const registerUser = async (
  userName: string,
  userPass: string,
): Promise<RegisterUser> => {
  const response = await axiosDefault.post("/register", {
    user_name: userName,
    user_pass: userPass,
  });
  return response.data;
};
