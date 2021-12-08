import logger from "./logger.js";
import express from "express";
import morgan from "morgan";
import { selectAllUsers } from "./db.js";

export default (app) => {
  app.use(morgan("dev"));

  app.use("/", (req, res) => {
    selectAllUsers();
    res.send();
  });

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  //Error Handling
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
