import {
  deleteExpenseById,
  insertExpense,
  modifyExpenseById,
  selectAllTotals,
  selectExpensesByMonth,
} from "../db/expenses.js";
import { ServerError } from "../../utils/serverError.js";

export const createExpense = async (req, res, next) => {
  const { name, amount, date, keyMonth, categoryId } = req.expense;
  const expenseParams = [req.userId, name, amount, date, keyMonth, categoryId];
  const expense = await insertExpense(expenseParams);
  res.json(expense);
};

export const getExpensesByMonth = async (req, res, next) => {
  const { keyMonth } = req.params;
  if (!keyMonth.match(/^\d{4}-\d{2}$/gm))
    throw new ServerError("Invalid keyMonth", 400);
  const expenses = await selectExpensesByMonth(req.userId, keyMonth);
  const data = {
    keyMonth,
    expenses,
  };

  res.json(data);
};

export const getMonthlyTotals = async (req, res, next) => {
  const totals = await selectAllTotals(req.userId);
  res.json(totals);
};

export const putExpense = async (req, res, next) => {
  const { name, amount, date, keyMonth, categoryId } = req.expense;
  const expenseParams = [
    req.params.id,
    name,
    amount,
    date,
    keyMonth,
    categoryId,
  ];
  const expense = await modifyExpenseById(expenseParams);
  res.json(expense);
};

export const removeExpenseById = async (req, res, next) => {
  await deleteExpenseById(req.params.id);
  res.json(req.params.id);
};
