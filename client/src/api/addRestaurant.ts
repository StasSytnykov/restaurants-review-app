import axiosRestaurant from "@/api/axiosRestaurant.ts";
import { AddDeleteRestaurant } from "@/Types";

export const addRestaurant = async (
  name: string,
  location: string,
  price_range: number,
): Promise<AddDeleteRestaurant> => {
  const response = await axiosRestaurant.post("", {
    name,
    location,
    price_range,
  });
  return response.data;
};
