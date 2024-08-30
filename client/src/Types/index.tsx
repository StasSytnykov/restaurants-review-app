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
