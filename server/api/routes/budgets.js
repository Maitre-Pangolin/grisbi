import { Router } from "express";
import {
  createBudget,
  getBudgetByMonth,
  updateBudget,
} from "../controllers/budgets.js";
import { isAuth } from "../middlewares/auth.js";

/**
 * @swagger
 * components:
 *  schemas:
 *    Budget:
 *      type: object
 *      required:
 *        -userId
 *        -amount
 *        -keyMonth
 *      properties:
 *        userId:
 *          type: integer
 *          description: The id of the user who owns this budget
 *        amount:
 *          type: number
 *          description: The budget amount
 *        keyMonth:
 *          type: string
 *          description: A key indicating for which year and month this budget applies
 *      example:
 *        userId: 1
 *        amount: 1704.25
 *        keyMonth: 2021-11
 */

/**
 * @swagger
 * tags:
 *  name: Budget
 *  description :  budgets operations
 */

/**
 * @swagger
 * /api/budgets/{keyMonth}:
 *    get:
 *      summary: Returns the budget for the specified keyMonth for the identified user
 *      tags: [books]
 *      parameters:
 *        - in : path
 *          name: keyMonth
 *          schema:
 *            type: string
 *          required: true
 *          description: The budget keyMonth
 *      responses:
 *        200:
 *          description: Budget object for specified month
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/Budget'
 */

const router = Router();

router.use(isAuth);

router.get("/:keyMonth", getBudgetByMonth);
router.post("/:keyMonth", createBudget);
router.put("/:keyMonth", updateBudget);

export default router;
