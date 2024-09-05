import { Router } from "express";
import { handleLogout } from "../controllers/logout.controllers";

const router = Router();

router.get("/", handleLogout);

export default router;
