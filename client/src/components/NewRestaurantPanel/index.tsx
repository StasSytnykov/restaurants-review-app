import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { addRestaurants } from "@/api/restaurantsAPI.ts";
import { useHandleBasicDataOfRestaurant } from "@/hooks/useHandleBasicDataOfRestaurant.ts";
import { Button } from "@/components/ui/button.tsx";
import { FormContent } from "@/components/FormContent";
import { Restaurant } from "@/Types";

export const NewRestaurantPanel = () => {
  const {
    name,
    location,
    priceRange,
    onNameChange,
    onLocationChange,
    onPriceRangeChange,
    onResetFields,
  } = useHandleBasicDataOfRestaurant();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      location,
      price_range,
    }: Omit<Restaurant, "restaurant_uid" | "average_rating" | "review_count">) => {
      return addRestaurants(name, location, price_range);
    },
    onSuccess: () => {
      toast.success("You added restaurant successfully!");
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ name, location, price_range: priceRange.length });
    onResetFields();
  };

  return (
    <form
      onSubmit={handleSubmitForm}
      className="flex gap-4 justify-center items-end"
    >
      <FormContent
        location={location}
        name={name}
        onLocationChange={onLocationChange}
        onNameChange={onNameChange}
        onPriceRangeChange={onPriceRangeChange}
        priceRange={priceRange}
      />
      <Button disabled={isPending} type="submit">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
      </Button>
    </form>
  );
};
