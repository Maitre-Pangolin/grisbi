import validator from "email-validator";
import bcrypt from "bcryptjs";

export const validateSignIn = (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password)
    return res.status(400).send();
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
    return res.status(400).send();

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
