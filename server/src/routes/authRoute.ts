import { Router } from "express";
import { handleLogin } from "../controllers/auth.controllers";

const router = Router();

router.post("/", handleLogin);

export default router;
