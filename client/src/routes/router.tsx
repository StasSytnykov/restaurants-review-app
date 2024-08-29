import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Home";
import { RestaurantDetails } from "./RestaurantDetails";
import { UpdateRestaurant } from "@/routes/UpdateRestaurant";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details",
    element: <RestaurantDetails />,
  },
  {
    path: "/update",
    element: <UpdateRestaurant />,
  },
]);
