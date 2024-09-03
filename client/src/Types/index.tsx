export interface Restaurant {
  restaurant_uid: string;
  name: string;
  location: string;
  price_range: number;
  average_rating: number;
  review_count: number;
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
