import routerExpenses from "./routes/expenses.js";
import routerAuth from "./routes/auth.js";
import routerCategories from "./routes/categories.js";
import routerBudgets from "./routes/budgets.js";

import { Router } from "express";
import { getMonthlyTotalsAndBudgets } from "./controllers/month.js";
import { isAuth } from "./middlewares/auth.js";

const router = Router(); //the api router

router.use("/", routerAuth);
router.use("/expenses", routerExpenses);
router.use("/budgets", routerBudgets);
router.use("/categories", routerCategories);
router.use("/monthly", isAuth, getMonthlyTotalsAndBudgets);

export default router;
