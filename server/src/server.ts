import "dotenv/config";
import express from "express";
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

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.post("/api/v1/restaurants", addRestaurant);
app.get("/api/v1/restaurants", getRestaurants);
app.get("/api/v1/restaurants/:id", getRestaurantById);
app.put("/api/v1/restaurants/:id", updateRestaurant);
app.delete("/api/v1/restaurants/:id", deleteRestaurant);
app.post("/api/v1/restaurants/:id/addReview", addReview);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
