import "dotenv/config";
import express, { Request, Response } from "express";
import morgan from "morgan";
import pool from "../db";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/api/v1/restaurants", async (req: Request, res: Response) => {
  console.log("test");
  const query = "SELECT * FROM restaurant";
  const results = await pool.query(query);
  console.log(results);
});

app.get("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurants: ["McDonalds, Pizzahub"],
    },
  });
});

app.post("/api/v1/restaurants", async (req: Request, res: Response) => {
  res.status(201).json({
    status: "success",
    data: {
      restaurants: ["McDonalds, Pizzahub"],
    },
  });
});

app.put("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurants: ["McDonalds, Pizzahub"],
    },
  });
  console.log(req.body);
  console.log(req.params);
});

app.delete("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
