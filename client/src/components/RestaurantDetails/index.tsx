import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Stars } from "@/components/Stars";

interface RestaurantDetailsProps {
  title: string;
}

export const RestaurantDetails = ({ title }: RestaurantDetailsProps) => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 4.5,
      comment: "Excellent food and atmosphere. Highly recommended!",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 5,
      comment: "The best restaurant in town. Impeccable service!",
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 4,
      comment: "Great experience overall. Will definitely come back.",
    },
  ];

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
              <p>{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
