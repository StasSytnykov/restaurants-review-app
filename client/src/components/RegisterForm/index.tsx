import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/authApi.ts";
import { LoaderButton } from "@/components/LoaderButton";

export const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      userName,
      userPass,
    }: {
      userName: string;
      userPass: string;
    }) => {
      return registerUser(userName, userPass);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userName || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    mutate({ userName, userPass: confirmPassword });

    // For demonstration, we'll just redirect to a success page
    navigate("/login");
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
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
          <div className="space-y-2">
            <InputWithLabel
              name="Confirm Password"
              type="password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="cofirmPassword"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <LoaderButton
            buttonType="submit"
            isPending={isPending}
            text="Register"
            buttonClasses="w-full"
          />
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
