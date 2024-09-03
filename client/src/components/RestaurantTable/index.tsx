import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRestaurants } from "@/api/restaurantsAPI.ts";
import { DeleteWarning } from "@/components/DeleteWarning";
import { UpdateRestaurantDialog } from "@/components/UpdateRestaurantDialog";
import { RatingStars } from "@/components/RatingStars";
import { useRestaurantsStore } from "@/store/restaurants.tsx";

export const RestaurantTable = () => {
  const { restaurants, setRestaurants } = useRestaurantsStore((state) => state);
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  useEffect(() => {
    if (data) {
      setRestaurants(data.data.restaurants);
    }
  }, [data]);

  return (
    <Table className="mx-auto w-2/4 mt-8">
      <TableCaption>A list of your added restaurants.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Price Range</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isError && (
          <TableRow>
            <TableCell>{error.message}</TableCell>
          </TableRow>
        )}
        {isPending && (
          <TableRow className="w-full">
            <TableCell>Loading...</TableCell>
          </TableRow>
        )}
        {restaurants &&
          restaurants.map((restaurant) => (
            <TableRow
              key={restaurant.restaurant_uid}
              className="cursor-pointer"
              onClick={() =>
                navigate(`/restaurant/${restaurant.restaurant_uid}`)
              }
            >
              <TableCell className="font-medium">{restaurant.name}</TableCell>
              <TableCell>{restaurant.location}</TableCell>
              <TableCell>{"$".repeat(restaurant.price_range)}</TableCell>
              <TableCell>
                <RatingStars
                  rating={restaurant.average_rating}
                  reviewsCount={restaurant.review_count}
                />
              </TableCell>
              <TableCell>
                <UpdateRestaurantDialog
                  restaurantId={restaurant.restaurant_uid}
                />
              </TableCell>
              <TableCell>
                <DeleteWarning restaurantId={restaurant.restaurant_uid} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
