import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button.tsx";
import { getRestaurants } from "@/api/getRestaurants.ts";

export const RestaurantTable = () => {
  const {
    data: restaurants,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

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
        {isError && <TableRow>{error.message}</TableRow>}
        {isPending && <div className="w-full">Loading...</div>}
        {restaurants &&
          restaurants.data.restaurants.map((restaurant) => (
            <TableRow>
              <TableCell className="font-medium">{restaurant.name}</TableCell>
              <TableCell>{restaurant.location}</TableCell>
              <TableCell>{restaurant.price_range}</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>
                <Button variant="secondary">Update</Button>
              </TableCell>
              <TableCell>
                <Button variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
