import { createUser, selectUserByEmail, selectUserById } from "../db/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { ServerError } from "../../utils/serverError.js";
import { insertRefreshToken, modifyRefreshTokenById } from "../db/auth.js";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, config.token_secret, { expiresIn: "15min" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, config.refresh_token_secret, { expiresIn: "2d" });
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.user;

  try {
    const user = await selectUserByEmail(email);
    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) throw new ServerError("Wrong Password", 400);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);
    await insertRefreshToken(refreshToken, user.id);
    res
      .header({ "access-token": accessToken, "refresh-token": refreshToken })
      .send();
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    //should remove
    const accessToken = generateAccessToken(req.userId);
    const refreshToken = generateRefreshToken(req.userId);
    await modifyRefreshTokenById(refreshToken, req.userId);
    res
      .header({ "access-token": accessToken, "refresh-token": refreshToken })
      .send();
  } catch (error) {
    console.log(error);
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
