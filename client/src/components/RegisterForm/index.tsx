import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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

export const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    // Here you would typically make an API call to register the user
    console.log("Registration submitted:", { userName, password });

    // For demonstration, we'll just redirect to a success page
    navigate("/register-success");
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
              value={password}
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
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
