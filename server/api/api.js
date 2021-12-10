import routerExpenses from "./routes/expenses.js";
import routerUser from "./routes/users.js";

import { Router } from "express";

const router = Router(); //the api router

router.use("/users", routerUser);
router.use("/expenses", routerExpenses);

export default router;
