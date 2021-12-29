import { createUser, selectUserByEmail, selectUserById } from "../db/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { ServerError } from "../../utils/serverError.js";
import {
  deleteRefreshTokenById,
  insertRefreshToken,
  modifyRefreshTokenById,
} from "../db/auth.js";

const generateAccessToken = (data) => {
  return jwt.sign(data, config.token_secret, { expiresIn: "30s" });
};

const generateRefreshToken = (data) => {
  return jwt.sign(data, config.refresh_token_secret, { expiresIn: "1m" });
};

export const signIn = async (req, res, next) => {
  try {
    const {
      id,
      email,
      user_name: username,
      created_at: createdAt,
      password,
    } = await selectUserByEmail(req.user.email);
    const isMatchedPassword = await bcrypt.compare(req.user.password, password);

    if (!isMatchedPassword) throw new ServerError("Wrong Password", 400);

    const accessToken = generateAccessToken({ id });
    const refreshToken = generateRefreshToken({
      id,
      email,
      username,
      createdAt,
    });
    await deleteRefreshTokenById(id);
    await insertRefreshToken(refreshToken, id);
    res
      .header({ "access-token": accessToken, "refresh-token": refreshToken })
      .send();
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await deleteRefreshTokenById(req.user.id);
    res.send();
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const accessToken = generateAccessToken({ id: req.user.id });
    const refreshToken = generateRefreshToken(req.user);
    await modifyRefreshTokenById(refreshToken, req.user.id);
    res
      .header({ "access-token": accessToken, "refresh-token": refreshToken })
      .send();
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (req, res, next) => {
  const { firstname, lastname, username, email, password } = req.user;
  const userParam = [firstname, lastname, username, email, password];
  try {
    const user = await createUser(userParam);
    res.json(user);
  } catch (error) {
    error.status = error.status || 409;
    next(error);
  }
};
/*
export const getUserById = async (req, res, next) => {
  try {
    const { id, first_name, last_name, user_name, email } =
      await selectUserById(req.userId);

    res.json({ id, first_name, last_name, user_name, email });
  } catch (error) {
    next(error);
  }
};
*/
