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

router.route("/").post(addRestaurant).get(getRestaurants);
router
  .route("/:id")
  .get(verifyJWT, getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);
router.post("/:id/review", addReview);

export default router;
