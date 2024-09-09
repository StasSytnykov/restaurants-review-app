import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RestaurantDetails } from "@/components/RestaurantDetails";
import { ReviewForm } from "@/components/ReviewForm";
import { useUserStore } from "@/store/user.tsx";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate.ts";

export const RestaurantDetailsPage = () => {
  const user = useUserStore((state) => state.user);
  const { restaurantId } = useParams();
  const privateAxios = useAxiosPrivate();

  const {
    data: restaurantItem,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurantItem"],
    queryFn: async () => {
      if (restaurantId && user) {
        const response = await privateAxios.get(`/restaurants/${restaurantId}`);
        return response.data;
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
