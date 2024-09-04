import { Request, Response } from "express";
import pool from "../../db";

const addRestaurant = async (req: Request, res: Response) => {
  try {
    const query =
      "INSERT INTO restaurant (restaurant_uid, name, location, price_range) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *";
    const results = await pool.query(query, [
      req.body.name,
      req.body.location,
      req.body.price_range,
    ]);

    res
      .status(201)
      .location(`api/v1/restaurants/${results.rows[0].restaurant_uid}`)
      .json({
        status: "success",
        data: {
          restaurants: results.rows[0],
        },
      });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

const getRestaurants = async (req: Request, res: Response) => {
  try {
    const query =
      "SELECT restaurant.*, CAST(rev.review_count AS INTEGER) AS review_count, CAST(rev.average_rating AS INTEGER) AS average_rating FROM restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, AVG(rating)::NUMERIC(10,2) AS average_rating FROM reviews GROUP BY restaurant_id) rev ON rev.restaurant_id = restaurant_uid";
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
};

const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const query =
      "SELECT restaurant.*, CAST(rev.review_count AS INTEGER) AS review_count, CAST(rev.average_rating AS INTEGER) AS average_rating FROM restaurant LEFT JOIN (SELECT restaurant_id, COUNT(*) AS review_count, AVG(rating)::NUMERIC(10,2) AS average_rating FROM reviews GROUP BY restaurant_id) rev ON rev.restaurant_id = restaurant_uid WHERE restaurant_uid = $1";
    const reviewQuery = "SELECT * FROM reviews WHERE restaurant_id = $1";
    const results = await pool.query(query, [req.params.id]);
    const reviewsResults = await pool.query(reviewQuery, [req.params.id]);

    res.status(200).json({
      status: "success",
      data: {
        restaurants: results.rows[0],
        reviews: reviewsResults.rows,
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

const updateRestaurant = async (req: Request, res: Response) => {
  const { name, location, price_range, id } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Name is required field",
    });
    return;
  }
  if (!location) {
    res.status(400).json({
      message: "Location is required field",
    });
    return;
  }
  if (!price_range) {
    res.status(400).json({
      message: "Price Range is required field",
    });
    return;
  }

  try {
    const query =
      "UPDATE restaurant SET name = $1, location = $2, price_range = $3 WHERE restaurant_uid = $4 RETURNING *";
    const results = await pool.query(query, [name, location, price_range, id]);

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const reviewsQuery = "DELETE FROM reviews WHERE restaurant_id = $1";
    await pool.query(reviewsQuery, [req.params.id]);
    const query =
      "DELETE FROM restaurant WHERE restaurant_uid = $1 RETURNING *";
    const results = await pool.query(query, [req.params.id]);
    console.log();

    if (!results.rows[0]) {
      res.status(404).json({
        message: "Resource not found",
      });
      return;
    }

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

const addReview = async (req: Request, res: Response) => {
  try {
    const query =
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *";
    const results = await pool.query(query, [
      req.params.id,
      req.body.name,
      req.body.review,
      req.body.rating,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
};

export {
  addRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addReview,
};
