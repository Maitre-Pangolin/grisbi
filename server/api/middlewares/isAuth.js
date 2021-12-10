import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { ServerError } from "../../utils/serverError.js";

export const isAuth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) throw new ServerError("Access Denied", 401);

  try {
    const verified = jwt.verify(token, config.token_secret);
    req.userId = verified.id;
    next();
  } catch (error) {
    next(error);
  }
};
