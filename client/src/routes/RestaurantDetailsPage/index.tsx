import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurant } from "@/api/restaurantsAPI.ts";
import { RestaurantDetails } from "@/components/RestaurantDetails";
import { ReviewForm } from "@/components/ReviewForm";

export const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();

  const {
    data: restaurant,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      if (restaurantId) {
        return await getRestaurant(restaurantId);
      }
    },
  });

  if (isPending) return <section>Loading...</section>;

  if (isError) return <section>{error.message}</section>;

  return (
    restaurant && (
      <section>
        <RestaurantDetails title={restaurant.data.restaurant.name} />
        <ReviewForm />
      </section>
    )
  );
};
