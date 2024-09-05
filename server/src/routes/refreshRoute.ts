import { Router } from "express";
import { handleRefreshToken } from "../controllers/refreshToken.contorllers";

const router = Router();

router.get("/", handleRefreshToken);

export default router;
