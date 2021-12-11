import { Router } from "express";
import {
  createExpense,
  getExpensesByMonth,
  getMonthlyTotals,
  putExpense,
  removeExpenseById,
} from "../controllers/expenses.js";
import {
  validateExpense,
  validateExpenseUserId,
} from "../middlewares/expenses.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.use(isAuth);

router.get("/totals", getMonthlyTotals);
router.post("/", validateExpense, createExpense);
router.get("/month/:keyMonth", getExpensesByMonth);
router.put("/:id", validateExpense, validateExpenseUserId, putExpense);
router.delete("/:id", validateExpenseUserId, removeExpenseById);

export default router;
