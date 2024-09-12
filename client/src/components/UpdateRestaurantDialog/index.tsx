import { useMutation } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateRestaurants } from "@/api/restaurantsAPI.ts";
import { useHandleBasicDataOfRestaurant } from "@/hooks/useHandleBasicDataOfRestaurant.ts";
import { FormContent } from "@/components/FormContent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderButton } from "@/components/LoaderButton";
import { Restaurant } from "@/Types";
import { useRestaurantsStore } from "@/store/restaurants.tsx";

interface UpdateRestaurantDialogProps {
  restaurantId: string;
}

export function UpdateRestaurantDialog({
  restaurantId,
}: UpdateRestaurantDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateRestaurant: updateRestaurantStore } = useRestaurantsStore(
    (state) => state,
  );

  const {
    name,
    location,
    priceRange,
    onNameChange,
    onLocationChange,
    onPriceRangeChange,
    onResetFields,
  } = useHandleBasicDataOfRestaurant();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: ({
      name,
      location,
      price_range,
      restaurant_uid,
    }: Omit<Restaurant, "average_rating" | "review_count">) => {
      return updateRestaurants(name, location, price_range, restaurant_uid);
    },
  });

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      name,
      location,
      price_range: priceRange.length,
      restaurant_uid: restaurantId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      updateRestaurantStore(restaurantId, {
        name,
        location,
        price_range: priceRange.length,
      });
      setIsOpen(false);
      onResetFields();
      toast.success("Changes successfully applied!");
    }
  }, [isSuccess]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update restaurant</DialogTitle>
          <DialogDescription>
            Make changes to your restaurant here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
          <FormContent
            location={location}
            name={name}
            onLocationChange={onLocationChange}
            onNameChange={onNameChange}
            onPriceRangeChange={onPriceRangeChange}
            priceRange={priceRange}
          />
          <DialogFooter>
            <LoaderButton
              buttonType="submit"
              isPending={isPending}
              text="Save changes"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
