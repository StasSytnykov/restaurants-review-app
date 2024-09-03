import axiosRestaurant from "@/api/axiosRestaurant.ts";
import { AddDeleteRestaurant, Restaurant, Review } from "@/Types";

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

interface RestaurantsResponse {
  status: string;
  results: number;
  data: {
    restaurants: Restaurant;
    reviews: Review[];
  };
}

export const getRestaurants = async (): Promise<GetRestaurants> => {
  const response = await axiosRestaurant.get("");
  return response.data;
};

export const getRestaurantsById = async (
  restaurantId: string,
): Promise<RestaurantsResponse> => {
  const response = await axiosRestaurant.get(`/${restaurantId}`);
  return response.data;
};

export const addRestaurants = async (
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

export const updateRestaurants = async (
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

export const deleteRestaurants = async (
  restaurant_uid: string,
): Promise<AddDeleteRestaurant> => {
  const response = await axiosRestaurant.delete(`/${restaurant_uid}`);
  return response.data;
};
