import pg from "pg";
const { Pool } = pg;
import logger from "./logger.js";

const pool = new Pool();

export const connectionValidation = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
  } catch (error) {
    console.log("🔥 Wrong db connection", error.message);
    process.exit(1);
  }
};

export const selectAllUsers = async () => {
  try {
    const res = await pool.query("SELECT * FROM users");
    logger.log(res.rows);
  } catch (error) {
    console.log(error);
  }
};
