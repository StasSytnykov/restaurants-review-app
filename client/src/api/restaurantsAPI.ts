import axiosRestaurant from "@/api/axiosRestaurant.ts";
import { AddDeleteRestaurant, Restaurant } from "@/Types";

interface GetRestaurants {
  status: string;
  results: number;
  data: {
    restaurants: Restaurant[];
  };
}

interface UpdateRestaurants {
  status: string;
  results: number;
  data: {
    restaurants: Restaurant;
  };
}

export const getRestaurants = async (): Promise<GetRestaurants> => {
  const response = await axiosRestaurant.get("");
  return response.data;
};

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

export const updateRestaurant = async (
  restaurant_uid: string,
): Promise<UpdateRestaurants> => {
  const response = await axiosRestaurant.put(`/${restaurant_uid}`);
  return response.data;
};

export const deleteRestaurant = async (
  restaurant_uid: string,
): Promise<AddDeleteRestaurant> => {
  const response = await axiosRestaurant.delete(`/${restaurant_uid}`);
  return response.data;
};
