import { createUser, selectUserByEmail, selectUserById } from "../db/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { ServerError } from "../../utils/serverError.js";

export const signIn = async (req, res, next) => {
  const { email, password } = req.user;

  try {
    const user = await selectUserByEmail(email);
    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) throw new ServerError("Wrong Password", 400);

    const token = jwt.sign({ id: user.id }, config.token_secret);
    res.header("auth-token", token).json(user);
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  const { firstName, lastName, userName, email, password } = req.user;
  const userParam = [firstName, lastName, userName, email, password];
  try {
    const user = await createUser(userParam);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id, first_name, last_name, user_name, email } =
      await selectUserById(req.userId);

    res.json({ id, first_name, last_name, user_name, email });
  } catch (error) {
    next(error);
  }
};
