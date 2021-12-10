import { queryDB } from "../../loaders/db.js";
import { ServerError } from "../../utils/serverError.js";

export const selectUserByEmail = async (email) => {
  const queryString = `SELECT * from users WHERE email = $1`;
  const { rows } = await queryDB(queryString, [email]);
  if (rows.length) return rows[0];
  throw new ServerError("Not Found - Email does not exists", 400);
};

export const createUser = async (userParams) => {
  const queryString = `INSERT INTO users(first_name,last_name,user_name,email,password,created_at) VALUES ($1,$2,$3,$4,$5,NOW()) RETURNING *;`;
  const { rows } = await queryDB(queryString, userParams);
  return rows[0];
};

export const selectUserById = async (userId) => {
  const queryString = `SELECT * from users WHERE id = $1`;
  const { rows } = await queryDB(queryString, [userId]);
  if (rows.length) return rows[0];
  throw new ServerError("Not Found - User does not exists", 400);
};
