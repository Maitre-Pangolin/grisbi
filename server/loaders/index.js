import logger from "./logger.js";
import expressLoader from "./express.js";
import { DBLoader } from "./db.js";

export default async (app) => {
  await DBLoader();
  logger.log("✌️ Postgres loaded");

  expressLoader(app);
  logger.log("✌️ Express loaded");
};
