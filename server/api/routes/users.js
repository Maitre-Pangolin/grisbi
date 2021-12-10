import { Router } from "express";
import { signIn, signUp } from "../controllers/users.js";
import { validateSignIn, validateUser } from "../middlewares/users.js";

const router = Router();

router.post("/signin", validateSignIn, signIn);
router.post("/signup", validateUser, signUp);

export default router;
