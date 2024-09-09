import { Review } from "@/Types";
import { restaurantsAxios } from "@/api/axios.ts";

interface AddReviewResponse {
  status: string;
  data: {
    review: Review;
  };
}

export const addReview = async (
  restaurantId: string,
  name: string,
  review: string,
  rating: number,
): Promise<AddReviewResponse> => {
  const response = await restaurantsAxios.post(`/${restaurantId}/review`, {
    name,
    review,
    rating,
  });
  return response.data;
};
