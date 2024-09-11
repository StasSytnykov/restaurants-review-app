import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Review } from "@/Types";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/user.tsx";
import { useAxiosPrivate } from "@/hooks/useAxiosPrivate.ts";
import { AxiosError } from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";

interface ReviewFormProps {
  restaurantId: string;
}

interface ResponseReviews {
  status: string;
  data: { review: Review };
}

interface ErrorResponse {
  message: string;
}

export const ReviewForm = ({ restaurantId }: ReviewFormProps) => {
  const { user } = useUserStore((state) => state);
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const privateAxios = useAxiosPrivate();

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation<
    ResponseReviews,
    AxiosError<ErrorResponse>,
    Omit<Review, "id">
  >({
    mutationFn: async ({
      name,
      review,
      rating,
      restaurant_id,
    }: Omit<Review, "id">) => {
      const response = await privateAxios.post(`/${restaurant_id}/reviews`, {
        name,
        review,
        rating,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("You added review successfully!");
      queryClient.invalidateQueries({ queryKey: ["restaurantItem"] });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user?.userName) {
      mutate({
        name: user?.userName,
        review,
        rating: Number(rating),
        restaurant_id: restaurantId,
      });
      setRating("");
      setReview("");
    }
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="reviewForm" className="mb-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="rating">Rating</Label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1 Star</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                id="review"
                placeholder="Write your review here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>
        </form>
        {isError && !rating && !review && (
          <Alert variant="destructive">
            <AlertDescription>{error.response?.data.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setRating("");
            setReview("");
          }}
        >
          Clear
        </Button>
        <Button
          type="submit"
          form="reviewForm"
          disabled={isError && !rating && !review}
        >
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
};
