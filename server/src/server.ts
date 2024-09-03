import "dotenv/config";
import express, { Router } from "express";
import cors from "cors";
import morgan from "morgan";
import {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addReview,
} from "./controllers/index.controllers";

const app = express();

const router = Router();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.route("/api/v1/restaurants").post(addRestaurant).get(getRestaurants);
router
  .route("/api/v1/restaurants/:id")
  .get(getRestaurantById)
  .put(updateRestaurant)
  .delete(deleteRestaurant);
router.post("/api/v1/restaurants/:id/review", addReview);

app.use(router);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
