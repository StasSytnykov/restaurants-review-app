import { Router } from "express";
import {
  addRestaurant,
  addReview,
  deleteRestaurant,
  getRestaurantById,
  getRestaurants,
  updateRestaurant,
} from "../controllers/index.controllers";

const router = Router();

router.route("/").post(addRestaurant).get(getRestaurants);
router
  .route("/:id")
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);
router.post("/:id/review", addReview);

export default router;
