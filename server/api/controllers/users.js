import { getUserByEmail } from "../db/users.js";
import bcrypt from "bcryptjs";

export const signIn = async (req, res, next) => {
  const { email, password } = req.user;
  console.log(req.user);
  try {
    const user = await getUserByEmail(email);

    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (isMatchedPassword) return res.json(user);
    const err = new Error("Wrong Password");
    err["status"] = 400;
    throw err;
  } catch (error) {
    next(error);
  }
};
