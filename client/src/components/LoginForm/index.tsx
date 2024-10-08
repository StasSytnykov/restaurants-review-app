import { FormEvent, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputWithLabel } from "@/components/InputWithLabel";
import { LoginUser, loginUser } from "@/api/authApi.ts";
import { useUserStore } from "@/store/user.tsx";
import { LoaderButton } from "@/components/LoaderButton";
import { Checkbox } from "@/components/ui/checkbox.tsx";

interface LoginPayload {
  userName: string;
  userPass: string;
}

export const LoginForm = () => {
  const { login, setPersist } = useUserStore((state) => state);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isTrust, setIsTrust] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { mutate, isPending } = useMutation<
    LoginUser,
    AxiosError<any>,
    LoginPayload
  >({
    mutationFn: ({ userName, userPass }: LoginPayload) => {
      return loginUser(userName, userPass);
    },
    onSuccess: (data) => {
      login({ userName: userName, accessToken: data.accessToken });
      setPersist(isTrust);
      navigate(from);
    },
    onError: (error) => {
      if (!error?.response) {
        return setError("No server response");
      }
      if (error?.response?.status === 401) {
        return setError("Wrong password or user name");
      }
      return setError("Login failed");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userName || !password) {
      setError("Email and password are required");
      return;
    }

    mutate({ userName, userPass: password });
  };

  return (
    <Card className="w-[350px] mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access this page
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <InputWithLabel
              name="User name"
              type="text"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
              id="userName"
            />
          </div>
          <div className="space-y-2">
            <InputWithLabel
              name="Password"
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div className="items-center flex space-x-2">
            <Checkbox
              id="persist"
              onCheckedChange={() => {
                setIsTrust((prevState) => !prevState);
              }}
              checked={isTrust}
            />
            <label
              htmlFor="persist"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Trust this device
            </label>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <LoaderButton
            buttonType="submit"
            isPending={isPending}
            text="Login"
            buttonClasses="w-full"
          />
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {/*<a*/}
        {/*  href="/forgot-password"*/}
        {/*  className="text-sm text-primary hover:underline"*/}
        {/*>*/}
        {/*  Forgot password?*/}
        {/*</a>*/}
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
