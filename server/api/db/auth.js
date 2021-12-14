import { queryDB } from "../../loaders/db.js";
import { ServerError } from "../../utils/serverError.js";

export const deleteRefreshTokenById = async (id) => {
  const queryString = `DELETE FROM refresh_token WHERE user_id = $1 RETURNING *`;
  const { rows } = await queryDB(queryString, [id]);
  if (rows.length) return rows[0];
  throw new ServerError("Not Found - Refresh Token does not exists", 400);
};

export const selectRefreshTokenById = async (id) => {
  const queryString = `SELECT * FROM refresh_token WHERE user_id = $1`;
  const { rows } = await queryDB(queryString, [id]);
  if (rows.length) return rows[0].token;
  throw new ServerError("Not Found - Refresh Token does not exists", 400);
};

export const modifyRefreshTokenById = async (token, id) => {
  const queryString = `UPDATE refresh_token SET token=$1 WHERE user_id = $2 RETURNING *`;
  const { rows } = await queryDB(queryString, [token, id]);
  if (rows.length) return rows[0];
  throw new ServerError("Not Found - Refresh Token does not exists", 400);
};

export const insertRefreshToken = async (token, id) => {
  const queryString = `INSERT INTO refresh_token VALUES($1,$2)`;
  await queryDB(queryString, [token, id]);
};
