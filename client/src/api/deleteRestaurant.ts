import axiosRestaurant from "@/api/axiosRestaurant.ts";
import { AddDeleteRestaurant } from "@/Types";

export const deleteRestaurant = async (
  restaurant_uid: string,
): Promise<AddDeleteRestaurant> => {
  const response = await axiosRestaurant.delete(`/${restaurant_uid}`);
  return response.data;
};
