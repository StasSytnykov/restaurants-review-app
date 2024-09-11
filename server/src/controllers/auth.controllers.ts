import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../db";

const handleLogin = async (req: Request, res: Response) => {
  const { user_name, user_pass } = req.body;
  if (!user_name || !user_pass)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  const usersQuery = "SELECT * FROM users WHERE user_name = $1";
  const usersResult = await pool.query(usersQuery, [user_name]);

  if (usersResult.rows.length <= 0) return res.sendStatus(401);
  const match = await bcrypt.compare(user_pass, usersResult.rows[0].pass_hash);
  if (match) {
    const accessToken = jwt.sign(
      { user_name: usersResult.rows[0].user_name },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: "900s" },
    );
    const refreshToken = jwt.sign(
      { user_name: usersResult.rows[0].user_name },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: "1d" },
    );

    try {
      const loginQuery =
        "UPDATE users SET refresh_token = $1 WHERE user_id = $2";
      await pool.query(loginQuery, [refreshToken, usersResult.rows[0].user_id]);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        status: "success",
        message: `User ${user_name} is logged in!`,
        accessToken,
      });
    } catch (error) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

export { handleLogin };
