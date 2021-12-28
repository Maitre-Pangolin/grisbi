import {
  insertBudget,
  modifyBudget,
  selectBudgetByMonth,
} from "../db/budgets.js";

export const getBudgetByMonth = async (req, res, next) => {
  const { keyMonth } = req.params;
  if (!keyMonth.match(/^\d{4}-\d{2}$/gm))
    throw new ServerError("Invalid keyMonth", 400);
  const budget = await selectBudgetByMonth(req.userId, keyMonth);

  res.json({ budget });
};

export const createBudget = async (req, res, next) => {
  const { keyMonth } = req.params;
  const { amount } = req.body;
  if (!keyMonth.match(/^\d{4}-\d{2}$/gm))
    throw new ServerError("Invalid keyMonth", 400);
  try {
    const budget = await insertBudget(req.userId, amount, keyMonth);
    res.json({ budget });
  } catch (error) {
    next(error);
  }
};

export const updateBudget = async (req, res, next) => {
  const { keyMonth } = req.params;
  const { amount } = req.body;
  if (!keyMonth.match(/^\d{4}-\d{2}$/gm))
    throw new ServerError("Invalid keyMonth", 400);
  try {
    console.log(req.body);
    const budget = await modifyBudget(req.userId, amount, keyMonth);
    res.json({ budget });
  } catch (error) {
    next(error);
  }
};
