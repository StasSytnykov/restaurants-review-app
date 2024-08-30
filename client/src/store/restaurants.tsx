import { create } from "zustand";
import { Restaurant } from "@/Types";

interface RestaurantsStore {
  restaurants: Restaurant[];
  setRestaurants: (restaurants: Restaurant[]) => void;
  removeRestaurant: (restaurantId: string) => void;
  updateRestaurant: (
    restaurantId: string,
    updatedRestaurant: Restaurant,
  ) => void;
}

export const useRestaurantsStore = create<RestaurantsStore>()((set) => ({
  restaurants: [],
  setRestaurants: (restaurants: Restaurant[]) => set(() => ({ restaurants })),
  removeRestaurant: (restaurantId) =>
    set((state) => ({
      restaurants: state.restaurants.filter(
        (restaurant) => restaurant.restaurant_uid !== restaurantId,
      ),
    })),
  updateRestaurant: (restaurantId, updatedRestaurant) =>
    set((state) => ({
      restaurants: state.restaurants.map((restaurant) => {
        if (restaurantId === restaurant.restaurant_uid) {
          return { ...restaurant, updatedRestaurant };
        }
        return restaurant;
      }),
    })),
}));
