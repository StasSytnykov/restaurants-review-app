export interface Restaurant {
  restaurant_uid: string;
  name: string;
  location: string;
  price_range: number;
}

export interface AddDeleteRestaurant {
  status: string;
  data: {
    restaurant: Restaurant;
  };
}

export interface Review {
  id: string;
  restaurant_id: string;
  name: string;
  review: string;
  rating: number;
}
