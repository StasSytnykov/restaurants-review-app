import { Request, Response } from "express";
import pool from "../../db";

interface User {
  user_name: string;
  pass_hash: string;
  user_id: string;
  refresh_token: string;
}

const handleLogout = async (req: Request, res: Response) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const usersQuery = "SELECT * FROM users";
  const usersResult = await pool.query(usersQuery);
  const foundUser: User = usersResult.rows.find(
    (person) => person.refresh_token === refreshToken,
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  try {
    const logoutQuery =
      "UPDATE users SET refresh_token = '' WHERE user_id = $1";
    await pool.query(logoutQuery, [foundUser.user_id]);
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { handleLogout };
