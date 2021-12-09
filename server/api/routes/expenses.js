import { Router } from "express";
import { createExpense } from "../controllers/expenses.js";
import { validateExpense } from "../middlewares/expenses.js";

const router = Router();

router.post("/", validateExpense, createExpense);

export default router;
