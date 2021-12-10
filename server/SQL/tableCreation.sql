DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budgets;

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
  "name" varchar NOT NULL,
	"amount" double precision NOT NULL CHECK (amount>0),
  "date" date NOT NULL,
  "user_id" int REFERENCES users(id),
  "category_id" int REFERENCES "categories" ("id")
);

CREATE TABLE "budgets" (
  "id" SERIAL PRIMARY KEY,
  "amount" money,
  "month" date,
  "user_id" int REFERENCES users(id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO grisbi_admin;