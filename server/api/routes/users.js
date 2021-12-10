import { Router } from "express";
import { getUserById, signIn, signUp } from "../controllers/users.js";
import { isAuth } from "../middlewares/isAuth.js";
import { validateSignIn, validateUser } from "../middlewares/users.js";

const router = Router();

router.post("/signin", validateSignIn, signIn);
router.post("/signup", validateUser, signUp);

router.get("/me", isAuth, getUserById);

export default router;
