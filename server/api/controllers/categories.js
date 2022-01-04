import { ServerError } from "../../utils/serverError.js";
import { selectCategories } from "../db/categories.js";

export const getCategories = async (req, res, next) => {
  try {
    const data = await selectCategories();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
