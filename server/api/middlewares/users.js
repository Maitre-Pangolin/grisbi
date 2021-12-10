import validator from "email-validator";
import bcrypt from "bcryptjs";
import { ServerError } from "../../utils/serverError.js";

export const validateSignIn = (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password)
    throw new ServerError("Invalid user for sign-in", 400);
  req.user = {
    email: req.body.email,
    password: req.body.password,
  };
  next();
};

export const validateUser = async (req, res, next) => {
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
