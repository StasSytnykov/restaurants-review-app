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

interface RestaurantResponse {
  status: string;
  results: number;
  data: {
    restaurant: Restaurant;
  };
}

export const getRestaurants = async (): Promise<GetRestaurants> => {
  const response = await axiosRestaurant.get("");
  return response.data;
};

export const getRestaurant = async (
  restaurantId: string,
): Promise<RestaurantResponse> => {
  const response = await axiosRestaurant.get(`/${restaurantId}`);
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
  name: string,
  location: string,
  price_range: number,
  restaurant_uid: string,
): Promise<UpdateRestaurants> => {
  const response = await axiosRestaurant.put(`/${restaurant_uid}`, {
    name,
    location,
    price_range,
  });
  return response.data;
};

export const deleteRestaurant = async (
  restaurant_uid: string,
): Promise<AddDeleteRestaurant> => {
  const response = await axiosRestaurant.delete(`/${restaurant_uid}`);
  return response.data;
};
