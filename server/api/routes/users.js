import { Router } from "express";
import { signIn } from "../controllers/users.js";
import { validateUser } from "../middlewares/users.js";

const router = Router();

router.post("/signin", validateUser, signIn);

export default router;
