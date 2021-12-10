import { queryDB } from "../../loaders/db.js";

export const getUserByEmail = async (email) => {
  const queryString = `SELECT * from users WHERE email = $1`;
  const { rows } = await queryDB(queryString, [email]);
  if (rows.length) return rows[0];
  const err = new Error("Not Found - Email does not exists");
  err["status"] = 400;
  throw err;
};

export const createUser = async (userParams) => {
  const queryString = `INSERT INTO users(first_name,last_name,user_name,email,password,created_at) VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *;`;
  const { rows } = await queryDB(queryString, userParams);
  return rows[0];
};
