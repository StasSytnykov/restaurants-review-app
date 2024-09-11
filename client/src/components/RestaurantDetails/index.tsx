import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Review } from "@/Types";
import { RatingStars } from "@/components/RatingStars";

interface RestaurantDetailsProps {
  title: string;
  reviews: Review[];
  rating: number;
  reviewsCount: number;
}

export const RestaurantDetails = ({
  title,
  reviews,
  rating,
  reviewsCount,
}: RestaurantDetailsProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
      <div className="my-4 flex items-center justify-center">
        <RatingStars rating={rating} reviewsCount={reviewsCount} />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{review.name}</span>
                <RatingStars rating={review.rating} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{review.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
