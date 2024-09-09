import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { RestaurantDetailsPage } from "@/routes/RestaurantDetailsPage";
import { Register } from "@/routes/Register";

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
    path: "/RegisterForm",
    element: <Register />,
  },
]);
