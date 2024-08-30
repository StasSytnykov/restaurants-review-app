import axiosRestaurant from "@/api/axiosRestaurant.ts";
import { Restaurant } from "@/Types";

interface AddRestaurant {
  status: string;
  data: {
    restaurant: Restaurant;
  };
}

export const addRestaurants = async (
  name: string,
  location: string,
  price_range: string,
): Promise<AddRestaurant> => {
  const response = await axiosRestaurant.post("", {
    name,
    location,
    price_range,
  });
  return response.data;
};
