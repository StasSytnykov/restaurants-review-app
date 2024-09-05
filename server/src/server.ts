import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import restaurantsRoute from "./routes/restaurantsRoute";
import registerRouter from "./routes/registerRoute";
import authRoute from "./routes/authRoute";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/restaurants", restaurantsRoute);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/auth", authRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
