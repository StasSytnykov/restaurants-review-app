import "dotenv/config";
import express, { Request, Response } from "express";
import morgan from "morgan";
import pool from "../db";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.get("/api/v1/restaurants", async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM restaurant";
    const results = await pool.query(query);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

app.get("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM restaurant WHERE restaurant_uid = $1";
    const results = await pool.query(query, [req.params.id]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

app.post("/api/v1/restaurants", async (req: Request, res: Response) => {
  try {
    const query =
      "INSERT INTO restaurant (restaurant_uid, name, location, price_range) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *";
    const results = await pool.query(query, [
      req.body.name,
      req.body.location,
      req.body.price_range,
    ]);
    console.log(results);

    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

app.put("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const query =
      "UPDATE restaurant SET name = $1, location = $2, price_range = $3 WHERE restaurant_uid = $4 RETURNING *";
    const results = await pool.query(query, [
      req.body.name,
      req.body.location,
      req.body.price_range,
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

app.delete("/api/v1/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const query =
      "DELETE FROM restaurant WHERE restaurant_uid = $1 RETURNING *";
    const results = await pool.query(query, [req.params.id]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
