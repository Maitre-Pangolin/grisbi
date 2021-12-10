import { queryDB } from "../../loaders/db.js";

export const getUserByEmail = async (email) => {
  const queryString = `SELECT * from users WHERE email = $1`;
  const { rows } = await queryDB(queryString, [email]);
  if (rows.length) return rows[0];
  const err = new Error("Not Found - Email does not exists");
  err["status"] = 400;
  throw err;
};
