import { Router } from "express";
import {
  createBudget,
  getBudgetByMonth,
  updateBudget,
} from "../controllers/budgets.js";
import { isAuth } from "../middlewares/auth.js";

const router = Router();

router.use(isAuth);

router.get("/:keyMonth", getBudgetByMonth);
router.post("/:keyMonth", createBudget);
router.put("/:keyMonth", updateBudget);

export default router;
