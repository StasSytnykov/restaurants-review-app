import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../db";

interface User {
  user_name: string;
  pass_hash: string;
  user_id: string;
}

const handleLogin = async (req: Request, res: Response) => {
  const { user_name, user_pass } = req.body;
  if (!user_name || !user_pass)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  const usersQuery = "SELECT * FROM users";
  const usersResult = await pool.query(usersQuery);
  const foundUser: User = usersResult.rows.find(
    (person) => person.user_name === user_name,
  );
  if (!foundUser) return res.sendStatus(401);
  const match = await bcrypt.compare(user_pass, foundUser.pass_hash);
  if (match) {
    const accessToken = jwt.sign(
      { user_name: foundUser.user_name },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: "900s" },
    );
    const refreshToken = jwt.sign(
      { user_name: foundUser.user_name },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: "1d" },
    );

    try {
      const loginQuery =
        "UPDATE users SET refresh_token = $1 WHERE user_id = $2";
      await pool.query(loginQuery, [refreshToken, foundUser.user_id]);
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
