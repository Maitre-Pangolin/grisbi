import validator from "email-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { ServerError } from "../../utils/serverError.js";
import { selectRefreshTokenById } from "../db/auth.js";

export const validateSignin = (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password)
    throw new ServerError("Invalid user for sign-in", 400);
  req.user = {
    email: req.body.email,
    password: req.body.password,
  };
  next();
};

export const validateRefresh = async (req, res, next) => {
  try {
    const refreshToken = req.header("refresh-token");
    if (!refreshToken)
      throw new ServerError("Access Denied - No refresh token", 401);
    const { id, email, username, createdAt } = jwt.verify(
      refreshToken,
      config.refresh_token_secret
    );
    req.user = { id, email, username, createdAt };
    const dbToken = await selectRefreshTokenById(id);
    if (dbToken !== refreshToken)
      throw new ServerError("Refresh token do not match", 403);
    next();
  } catch (error) {
    next(error);
  }
};

export const validateSignup = async (req, res, next) => {
  if (
    !req.body ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.userName ||
    !req.body.email ||
    !req.body.password ||
    !validator.validate(req.body.email)
  )
    throw new ServerError("Invalid user for sign-up", 400);

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  req.user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password,
  };
  next();
};

export const isAuth = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1]; // Bearer xxxx
  if (!token) throw new ServerError("Access Denied", 401);

  try {
    const verified = jwt.verify(token, config.token_secret);
    req.userId = verified.id;
    next();
  } catch (error) {
    next(error);
  }
};
