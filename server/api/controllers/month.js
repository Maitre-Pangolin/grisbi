import { selectAllBudgets } from "../db/budgets.js";
import { selectAllTotals } from "../db/expenses.js";

export const getMonthlyTotalsAndBudgets = async (req, res, next) => {
  const totals = await selectAllTotals(req.userId);
  const budgets = await selectAllBudgets(req.userId);
  const months = {};
  totals.forEach(({ keyMonth, total }) => {
    months[keyMonth] = { total };
  });
  budgets.forEach(({ keyMonth, amount }) => {
    months[keyMonth] = { ...months[keyMonth], budget: amount };
  });
  res.json({ months });
};
