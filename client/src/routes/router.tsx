import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { RequireAuth } from "@/components/RequireAuth";
import { RestaurantDetailsPage } from "@/routes/RestaurantDetailsPage";
import { Register } from "@/routes/Register";
import { Login } from "@/routes/Login";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantDetailsPage />}
          />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
