import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { RequireAuth } from "@/components/RequireAuth";
import { RestaurantDetailsPage } from "@/routes/RestaurantDetailsPage";
import { Register } from "@/routes/Register";
import { Login } from "@/routes/Login";
import { Layout } from "@/components/Layout";
import { PersistLogin } from "@/components/PersistLogin";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route
                path="/restaurant/:restaurantId"
                element={<RestaurantDetailsPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
