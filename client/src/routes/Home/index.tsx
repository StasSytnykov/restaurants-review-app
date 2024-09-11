import { NewRestaurantPanel } from "@/components/NewRestaurantPanel";
import { RestaurantTable } from "@/components/RestaurantTable";

export const Home = () => {
  return (
    <>
      <section>
        <NewRestaurantPanel />
      </section>
      <section>
        <RestaurantTable />
      </section>
    </>
  );
};
