import routerExpenses from "./routes/expenses.js";
import authUser from "./routes/auth.js";

import { Router } from "express";

const router = Router(); //the api router

router.use("/", authUser);
router.use("/expenses", routerExpenses);

export default router;
