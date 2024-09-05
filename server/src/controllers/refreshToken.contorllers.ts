import { Request, Response } from "express";
import jwt, { Secret, VerifyErrors } from "jsonwebtoken";
import pool from "../../db";

interface User {
  user_name: string;
  pass_hash: string;
  user_id: string;
  refresh_token: string;
}

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const usersQuery = "SELECT * FROM users";
  const usersResult = await pool.query(usersQuery);
  const foundUser: User = usersResult.rows.find(
    (person) => person.refresh_token === refreshToken,
  );
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as Secret,
    (error: VerifyErrors | null, decoded: any) => {
      if (error || foundUser.user_name !== decoded.user_name)
        return res.sendStatus(403);
      const accessToken = jwt.sign(
        { user_name: decoded.user_name },
        process.env.ACCESS_TOKEN_SECRET as Secret,
        { expiresIn: "900s" },
      );
      res.json({ accessToken });
    },
  );
};

export { handleRefreshToken };
