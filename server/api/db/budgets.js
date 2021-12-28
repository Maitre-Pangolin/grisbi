import { queryDB } from "../../loaders/db.js";
import { ServerError } from "../../utils/serverError.js";

export const selectBudgetByMonth = async (userId, keyMonth) => {
  const queryString = `SELECT user_id as "userId" ,amount,key_month as "keyMonth" FROM budgets WHERE user_id=$1 AND key_month=$2;`;
  const { rows } = await queryDB(queryString, [userId, keyMonth]);
  return rows[0];
};

export const insertBudget = async (userId, amount, keyMonth) => {
  const queryString = `INSERT INTO budgets(user_id,amount,key_month) VALUES ($1,$2,$3) RETURNING user_id as "userId",amount,key_month as "keyMonth";`;
  const { rows } = await queryDB(queryString, [userId, amount, keyMonth]);
  return rows[0];
};

export const modifyBudget = async (userId, amount, keyMonth) => {
  const queryString = `UPDATE budgets SET amount = $2 WHERE user_id=$1 AND key_month=$3 RETURNING user_id as "userId",amount,key_month as "keyMonth";`;
  const { rows } = await queryDB(queryString, [userId, amount, keyMonth]);
  return rows[0];
};
