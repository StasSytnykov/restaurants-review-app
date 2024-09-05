import { Router } from "express";
import { handleNewUser } from "../controllers/register.controllers";

const router = Router();

router.post("/", handleNewUser);

export default router;
