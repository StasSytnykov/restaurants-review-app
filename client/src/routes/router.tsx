import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { RestaurantDetailsPage } from "@/routes/RestaurantDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/restaurant/:restaurantId",
    element: <RestaurantDetailsPage />,
  },
]);
