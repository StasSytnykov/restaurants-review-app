import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantsById } from "@/api/restaurantsAPI.ts";
import { RestaurantDetails } from "@/components/RestaurantDetails";
import { ReviewForm } from "@/components/ReviewForm";

export const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();

  const {
    data: restaurantItem,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurantItem"],
    queryFn: async () => {
      if (restaurantId) {
        return await getRestaurantsById(restaurantId);
      }
    },
  });

  if (isPending) return <section>Loading...</section>;

  if (isError) return <section>{error.message}</section>;

  return (
    restaurantItem && (
      <section>
        <RestaurantDetails
          reviewsCount={restaurantItem.data.restaurants.review_count}
          rating={restaurantItem.data.restaurants.average_rating}
          title={restaurantItem.data.restaurants.name}
          reviews={restaurantItem.data.reviews}
        />
        {restaurantId && <ReviewForm restaurantId={restaurantId} />}
      </section>
    )
  );
};
