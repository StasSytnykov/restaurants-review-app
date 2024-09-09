import { FormEvent, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

export const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userName || !password) {
      setError("Email and password are required");
      return;
    }

    // Here you would typically make an API call to authenticate the user
    console.log("Login submitted:", { userName, password });

    // For demonstration, we'll just redirect to a dashboard page
    navigate(from);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
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
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
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
