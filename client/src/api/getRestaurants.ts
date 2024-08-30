import axiosRestaurant from "@/api/axiosRestaurant.ts";
import { Restaurant } from "@/Types";

interface GetRestaurants {
  status: string;
  results: number;
  data: {
    restaurants: Restaurant[];
  };
}

export const getRestaurants = async (): Promise<GetRestaurants> => {
  const response = await axiosRestaurant.get("");
  return response.data;
};
