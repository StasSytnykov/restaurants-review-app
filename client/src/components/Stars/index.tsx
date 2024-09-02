import { Star, StarHalf } from "lucide-react";

interface StarsProps {
  rating: number;
}

export const Stars = ({ rating }: StarsProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />,
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <StarHalf
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />,
        );
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  return <div className="flex">{renderStars(rating)}</div>;
};
