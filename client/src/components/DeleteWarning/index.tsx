import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import { deleteRestaurant } from "@/api/restaurantsAPI.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useRestaurantsStore } from "@/store/restaurants.tsx";
import { Restaurant } from "@/Types";

interface DeleteWarningProps {
  restaurantId: string;
}

export const DeleteWarning = ({ restaurantId }: DeleteWarningProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const removeRestaurant = useRestaurantsStore(
    (state) => state.removeRestaurant,
  );
  const { mutate, isPending } = useMutation({
    mutationFn: ({ restaurant_uid }: Pick<Restaurant, "restaurant_uid">) => {
      return deleteRestaurant(restaurant_uid);
    },
    onSuccess: () => {
      toast.success("You deleted restaurant successfully!");
      removeRestaurant(restaurantId);
    },
  });

  const onDeleteRestaurant = () => {
    mutate({ restaurant_uid: restaurantId });
    setIsOpen(true);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            restaurant.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={onDeleteRestaurant}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
