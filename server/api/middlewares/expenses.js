export const validateExpense = (req, res, next) => {
  if (
    !req.body ||
    !req.body.name ||
    !req.body.amount ||
    !req.body.date ||
    !req.body.categoryId
  )
    return res.status(400).send();
  req.expense = {
    name: req.body.name,
    amount: Number(req.body.amount),
    date: req.body.date,
    categoryId: req.body.categoryId,
  };
  next();
};
