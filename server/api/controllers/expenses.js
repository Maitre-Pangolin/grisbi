import { insertExpense } from "../db/expenses.js";

export const createExpense = async (req, res, next) => {
  const { name, amount, date, categoryId } = req.expense;
  const expenseParams = [name, amount, date, 1, categoryId]; //["test", 20, "2016-12-30", 1, 1];
  const expense = await insertExpense(expenseParams);
  res.json(expense);
};
