import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "development") {
  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
  }
}

export default {
  port: parseInt(process.env.PORT, 10),
  token_secret: process.env.TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
};
