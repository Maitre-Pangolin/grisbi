DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS refresh_token;

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar(50) NOT NULL,
  "last_name" varchar(50) NOT NULL ,
  "user_name" varchar(50) NOT NULL UNIQUE,
  "email" varchar(50) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL,
  "created_at" date NOT NULL,
  "validated" boolean default false
);

CREATE TABLE "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50),
  "icon_id" integer
);

CREATE TABLE "expenses" (
  "id" SERIAL PRIMARY KEY,
	"user_id" int REFERENCES users(id),
  "name" varchar NOT NULL,
	"amount" double precision NOT NULL CHECK (amount>0),
  "date" date NOT NULL,
  "key_month" varchar(20) NOT NULL,
  "category_id" int REFERENCES "categories" ("id") DEFAULT 1
);

CREATE TABLE "budgets" (
  "id" SERIAL PRIMARY KEY,
  "amount" money,
  "month" date,
  "user_id" int REFERENCES users(id)
);

CREATE TABLE "refresh_token" (
  "token" varchar(400) PRIMARY KEY,
  "user_id" int UNIQUE REFERENCES users(id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO grisbi_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO grisbi_admin;