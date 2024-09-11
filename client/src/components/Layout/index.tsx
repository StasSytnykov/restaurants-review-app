import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

export const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <Outlet />
  </div>
);
