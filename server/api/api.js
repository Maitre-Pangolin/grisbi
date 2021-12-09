import routerExpenses from "./routes/expenses.js";

import { Router } from "express";

const router = Router(); //the api router

router.use("/expenses", routerExpenses);

export default router;
