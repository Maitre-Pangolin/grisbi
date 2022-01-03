import express from "express";
import morgan from "morgan";
import bodyparser from "body-parser";
import cors from "cors";
import logger from "./logger.js";
import routerAPI from "../api/api.js";
import path from "path";
import { ServerError } from "../utils/serverError.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (app) => {
  app.use(morgan("dev"));
  app.use(bodyparser.urlencoded({ extended: true }));
  app.use(bodyparser.json());
  app.use(cors());

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")));
  } else {
    app.use(express.static(path.join(__dirname, "public")));
  }

  app.use("/api", routerAPI);

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    throw new ServerError("Not found", 404);
  });

  //Error Handling
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    logger.log("Express error handler : ", err.status, err.message);

    if (err.status == 409 && err.message.match(/"users_(.*)_key"/)) {
      return res.json({
        error: err.message,
        duplicate: err.message.match(/"users_(.*)_key"/)[1],
      });
    }
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
