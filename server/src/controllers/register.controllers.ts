import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../../db";

const handleNewUser = async (req: Request, res: Response) => {
  const { user_name, user_pass } = req.body;
  if (!user_name || !user_pass)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });

  const usersQuery = "SELECT * FROM users";
  const usersResult = await pool.query(usersQuery);
  const isDuplicate = usersResult.rows.find(
    (person) => person.user_name === user_name,
  );
  if (isDuplicate) return res.sendStatus(409);

  try {
    const hashedPass = await bcrypt.hash(user_pass, 10);
    const addUserQuery =
      "INSERT INTO users (user_id, user_name, pass_hash) VALUES (uuid_generate_v4(), $1, $2) RETURNING *";
    await pool.query(addUserQuery, [user_name, hashedPass]);
    res.status(201).json({
      status: "success",
      message: `User ${user_name} successfully registered`,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { handleNewUser };
