import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import logger from "./logger.js";
import routerAPI from "../api/api.js";

export default (app) => {
  app.use(morgan("dev"));
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());
  app.use(cors());

  app.use("/api", routerAPI);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  //Error Handling
  app.use((err, req, res, next) => {
    logger.log(err);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
