import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import restaurantsRoute from "./routes/restaurantsRoute";
import registerRouter from "./routes/registerRoute";
import authRoute from "./routes/authRoute";
import refreshRoute from "./routes/refreshRoute";
import refreshLogout from "./routes/logoutRoute";
import credentials from "./middleware/credentials";
import corsOptions from "./config/corsOptions";

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", restaurantsRoute);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/refresh", refreshRoute);
app.use("/api/v1/logout", refreshLogout);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
