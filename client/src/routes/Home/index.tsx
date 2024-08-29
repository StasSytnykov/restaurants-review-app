import { Header } from "@/components/Header";
import { NewRestaurantPanel } from "@/components/NewRestaurantPanel";

export const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section>
          <NewRestaurantPanel />
        </section>
      </main>
    </>
  );
};
