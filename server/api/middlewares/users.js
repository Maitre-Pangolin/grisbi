export const validateUser = (req, res, next) => {
  if (!req.body || !req.body.email || !req.body.password)
    return res.status(400).send();
  req.user = {
    email: req.body.email,
    password: req.body.password,
  };
  next();
};
