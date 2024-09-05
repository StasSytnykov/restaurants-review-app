import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (error) => {
    if (error) return res.sendStatus(403);
    next();
  });
};
