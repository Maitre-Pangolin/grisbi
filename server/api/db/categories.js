import { queryDB } from "../../loaders/db.js";
import { ServerError } from "../../utils/serverError.js";

export const selectCategories = async () => {
  const queryString = `SELECT * FROM categories`;
  const { rows } = await queryDB(queryString);
  console.log(rows);
  return rows;
};
