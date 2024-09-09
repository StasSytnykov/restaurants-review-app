import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { RestaurantDetailsPage } from "@/routes/RestaurantDetailsPage";
import { Register } from "@/routes/Register";
import { Login } from "@/routes/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/restaurant/:restaurantId",
    element: <RestaurantDetailsPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
