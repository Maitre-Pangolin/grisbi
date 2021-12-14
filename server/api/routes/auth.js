import { Router } from "express";
import { getUserById, signIn, signUp, refresh } from "../controllers/auth.js";
import { isAuth } from "../middlewares/isAuth.js";
import {
  validateRefresh,
  validateSignin,
  validateSignup,
} from "../middlewares/auth.js";

const router = Router();

router.post("/signin", validateSignin, signIn);
router.post("/refresh", validateRefresh, refresh);
router.post("/signup", validateSignup, signUp);

router.get("/me", isAuth, getUserById);

export default router;
