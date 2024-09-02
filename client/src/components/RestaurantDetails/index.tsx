import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Stars } from "@/components/Stars";
import { Review } from "@/Types";

interface RestaurantDetailsProps {
  title: string;
  reviews: Review[];
}

export const RestaurantDetails = ({ title, reviews }: RestaurantDetailsProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{review.name}</span>
                <Stars rating={review.rating} />
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
