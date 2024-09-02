import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { addReview } from "@/api/reviewsAPI.ts";

interface ReviewFormProps {
  restaurantId: string;
}

export const ReviewForm = ({ restaurantId }: ReviewFormProps) => {
  const [rating, setRating] = useState("");
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      review,
      rating,
      restaurant_id,
    }: Omit<Review, "id">) => {
      return addReview(restaurant_id, name, review, rating);
    },
    onSuccess: () => {
      toast.success("You added review successfully!");
      queryClient.invalidateQueries({ queryKey: ["restaurant"] });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      name,
      review,
      rating: Number(rating),
      restaurant_id: restaurantId,
    });

    setRating("");
    setName("");
    setReview("");
  };

  if (isPending) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="reviewForm">
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
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            setRating("");
            setName("");
            setReview("");
          }}
        >
          Clear
        </Button>
        <Button type="submit" form="reviewForm">
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
};
