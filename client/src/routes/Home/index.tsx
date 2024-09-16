import { NewRestaurantPanel } from "@/components/NewRestaurantPanel";
import { RestaurantTable } from "@/components/RestaurantTable";

export const Home = () => {
  return (
    <>
      <section className="container">
        <NewRestaurantPanel />
      </section>
      <section className="container">
        <RestaurantTable />
      </section>
    </>
  );
};
