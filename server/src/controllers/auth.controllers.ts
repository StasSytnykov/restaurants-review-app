import { Request, Response } from "express";
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
    res
      .status(200)
      .json({ status: "success", message: `User ${user_name} is logged in!` });
  } else {
    res.sendStatus(401);
  }
};

export { handleLogin };
