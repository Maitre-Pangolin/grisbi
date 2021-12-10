import { getUserByEmail } from "../db/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

export const signIn = async (req, res, next) => {
  const { email, password } = req.user;

  try {
    const user = await getUserByEmail(email);

    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) {
      const err = new Error("Wrong Password");
      err["status"] = 400;
      throw err;
    }

    const token = jwt.sign({ id: user.id }, config.token_secret);
    return res.header("auth-token", token).json(user);
  } catch (error) {
    next(error);
  }
};
