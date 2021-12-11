import { queryDB } from "../../loaders/db.js";
import { ServerError } from "../../utils/serverError.js";

export const insertExpense = async (expenseParams) => {
  const queryString = `INSERT INTO expenses(user_id,name,amount,date,key_month,category_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;`;
  const { rows } = await queryDB(queryString, expenseParams);
  return rows[0];
};

export const selectExpensesByMonth = async (userId, keyMonth) => {
  const queryString = `SELECT * FROM expenses WHERE user_id=$1 AND key_month=$2;`;
  const { rows } = await queryDB(queryString, [userId, keyMonth]);
  return rows;
};

export const selectAllTotals = async (userId) => {
  const queryString = `SELECT key_month,sum(amount) as total FROM expenses WHERE user_id=$1 GROUP BY key_month;`;
  const { rows } = await queryDB(queryString, [userId]);
  return rows;
};

export const modifyExpenseById = async (expenseParams) => {
  const queryString = `UPDATE expenses SET name =$2, amount=$3,date=$4,key_month=$5,category_id=$6 WHERE id=$1 RETURNING *;`;
  const { rows } = await queryDB(queryString, expenseParams);
  return rows;
};

export const selectExpenseById = async (id) => {
  const queryString = `SELECT * FROM expenses WHERE id=$1`;
  const { rows } = await queryDB(queryString, [id]);
  if (!rows.length) throw new ServerError("Not found", 404);
  return rows[0];
};

export const deleteExpenseById = async (id) => {
  const queryString = `DELETE FROM expenses WHERE id=$1`;
  await queryDB(queryString, [id]);
};
