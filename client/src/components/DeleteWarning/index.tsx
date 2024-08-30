import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteRestaurant } from "@/api/deleteRestaurant.ts";
import { Restaurant } from "@/Types";
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
import { useState } from "react";

interface DeleteWarningProps {
  restaurantId: string;
}

export const DeleteWarning = ({ restaurantId }: DeleteWarningProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ restaurant_uid }: Pick<Restaurant, "restaurant_uid">) => {
      return deleteRestaurant(restaurant_uid);
    },
    onSuccess: () => {
      toast.success("You deleted restaurant successfully!");
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
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
