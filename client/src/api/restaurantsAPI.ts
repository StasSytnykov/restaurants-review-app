import { AddDeleteRestaurant, Restaurant } from "@/Types";
import { restaurantsAxios } from "@/api/axios.ts";

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
  const response = await restaurantsAxios.get("");
  return response.data;
};

export const addRestaurants = async (
  name: string,
  location: string,
  price_range: number,
): Promise<AddDeleteRestaurant> => {
  const response = await restaurantsAxios.post("", {
    name,
    location,
    price_range,
  });
  return response.data;
};

export const updateRestaurants = async (
  name: string,
  location: string,
  price_range: number,
  restaurant_uid: string,
): Promise<UpdateRestaurants> => {
  const response = await restaurantsAxios.put(`/${restaurant_uid}`, {
    name,
    location,
    price_range,
  });
  return response.data;
};

export const deleteRestaurants = async (
  restaurant_uid: string,
): Promise<AddDeleteRestaurant> => {
  const response = await restaurantsAxios.delete(`/${restaurant_uid}`);
  return response.data;
};
