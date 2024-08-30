import { Header } from "@/components/Header";
import { NewRestaurantPanel } from "@/components/NewRestaurantPanel";
import { RestaurantTable } from "@/components/RestaurantTable";

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section>
          <NewRestaurantPanel />
        </section>
        <section>
          <RestaurantTable />
        </section>
      </main>
    </>
  );
};
