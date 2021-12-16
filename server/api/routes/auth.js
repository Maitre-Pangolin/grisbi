import { Router } from "express";
import { signIn, signUp, refresh, logout } from "../controllers/auth.js";

import {
  validateRefresh,
  validateSignin,
  validateSignup,
  isAuth,
} from "../middlewares/auth.js";

const router = Router();

router.post("/signin", validateSignin, signIn);
router.post("/refresh", validateRefresh, refresh);
router.delete("/logout", validateRefresh, logout);
router.post("/signup", validateSignup, signUp);
/*
router.get("/me", isAuth, getUserById);
*/
export default router;
