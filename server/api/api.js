import routerExpenses from "./routes/expenses.js";
import routerAuth from "./routes/auth.js";
import routerCategories from "./routes/categories.js";
import routerBudgets from "./routes/budgets.js";

import { Router } from "express";

const router = Router(); //the api router

router.use("/", routerAuth);
router.use("/expenses", routerExpenses);
router.use("/budgets", routerBudgets);
router.use("/categories", routerCategories);

export default router;
