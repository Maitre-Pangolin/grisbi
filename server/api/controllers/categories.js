import { ServerError } from "../../utils/serverError.js";
import { selectCategories } from "../db/categories.js";

export const getCategories = async (req, res, next) => {
  try {
    const data = await selectCategories();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
