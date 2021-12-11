import { ServerError } from "../../utils/serverError.js";
import { selectExpenseById } from "../db/expenses.js";

export const validateExpense = (req, res, next) => {
  if (
    !req.body ||
    !req.body.name ||
    !req.body.amount ||
    !req.body.date ||
    !req.body.keyMonth ||
    !req.body.categoryId
  )
    throw new ServerError("Invalid expense", 401);
  req.expense = {
    name: req.body.name,
    amount: Number(req.body.amount),
    date: req.body.date,
    keyMonth: req.body.keyMonth,
    categoryId: req.body.categoryId,
  };
  next();
};

export const validateExpenseUserId = async (req, res, next) => {
  try {
    const { user_id } = await selectExpenseById(req.params.id);
    if (user_id !== req.userId)
      throw new ServerError("Access Denied - Do not own expense", 400);
    next();
  } catch (error) {
    next(error);
  }
};
