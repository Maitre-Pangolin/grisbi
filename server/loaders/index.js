import logger from "./logger.js";
import expressLoader from "./express.js";
import { connectionValidation } from "./db.js";

export default async (app) => {
  await connectionValidation();
  logger.log("✌️ Postgres loaded");

  expressLoader(app);
  logger.log("✌️ Express loaded");
};
