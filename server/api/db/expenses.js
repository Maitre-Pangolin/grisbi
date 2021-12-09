import { queryDB } from "../../loaders/db.js";

export const insertExpense = async (expenseParams) => {
  const queryString = `INSERT INTO expenses(name,amount,date,user_id,category_id) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
  const { rows } = await queryDB(queryString, expenseParams);
  return rows[0];
};
