import pg from "pg";
const { Pool } = pg;
import logger from "./logger.js";

const pool = new Pool(
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}
);

export const queryDB = async (query, params) => {
  return await pool.query(query, params);
};

export const DBLoader = async () => {
  try {
    await pool.query("SELECT NOW()");
    await loadCategories();
  } catch (error) {
    console.log("🔥 Wrong db connection", error.message);
    process.exit(1);
  }
};

export const loadCategories = async () => {
  const { rows } = await queryDB("SELECT * FROM categories");
  if (!rows.length) await queryDB(categoriesQuery);
};

const categoriesQuery = `
INSERT INTO categories(name)
VALUES ('Miscellaneous'),('Housing & Utilities'),('Transportation'),
('Groceries'),('Restaurant & Take-Out'),('Medical & Healthcare'),
('Sport'),('Recreation & Entertainement'),('Games'),('Clothing'),('Drinks');
`;
