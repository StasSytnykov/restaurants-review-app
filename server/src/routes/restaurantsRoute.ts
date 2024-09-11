import { Router } from "express";
import {
  addRestaurant,
  addReview,
  deleteRestaurant,
  getRestaurantById,
  getRestaurants,
  updateRestaurant,
} from "../controllers/index.controllers";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.route("/restaurants").post(addRestaurant).get(getRestaurants);
router
  .route("/restaurants/:id")
  .get(verifyJWT, getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);
router.post("/:id/reviews", verifyJWT, addReview);

export default router;
