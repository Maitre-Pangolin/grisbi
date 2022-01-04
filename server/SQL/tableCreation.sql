DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS refresh_token;

CREATE TABLE "users" (
  "id" int SERIAL PRIMARY KEY,
  "first_name" varchar(50) NOT NULL,
  "last_name" varchar(50) NOT NULL ,
  "user_name" varchar(50) NOT NULL UNIQUE,
  "email" varchar(50) NOT NULL UNIQUE,
  "password" varchar(100) NOT NULL,
  "created_at" date NOT NULL,
  "validated" boolean default false
);

CREATE TABLE "categories" (
  "id" int SERIAL PRIMARY KEY,
  "name" varchar(50)
);

CREATE TABLE "expenses" (
  "id" int SERIAL PRIMARY KEY,
	"user_id" int REFERENCES users(id),
  "name" varchar NOT NULL,
	"amount" double precision NOT NULL CHECK (amount>0),
  "date" varchar(20) NOT NULL,
  "key_month" varchar(20) NOT NULL,
  "category_id" int REFERENCES "categories" ("id") DEFAULT 1
);

CREATE TABLE "budgets" (
  "amount" double precision,
  "key_month" varchar(20),
  "user_id" int REFERENCES users(id),
  PRIMARY KEY (user_id,key_month)
);

CREATE TABLE "refresh_token" (
  "token" varchar(400) PRIMARY KEY,
  "user_id" int UNIQUE REFERENCES users(id)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO grisbi_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO grisbi_admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO MaitrePangolin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO MaitrePangolin;

INSERT INTO categories(name)
VALUES ('Miscellaneous');
INSERT INTO categories(name)
VALUES ('Housing & Utilities');
INSERT INTO categories(name)
VALUES ('Transportation');
INSERT INTO categories(name)
VALUES ('Groceries');
INSERT INTO categories(name)
VALUES ('Restaurant & Take-Out');
INSERT INTO categories(name)
VALUES ('Medical & Healthcare');
INSERT INTO categories(name)
VALUES ('Sport');
INSERT INTO categories(name)
VALUES ('Recreation & Entertainement');
INSERT INTO categories(name)
VALUES ('Games');
INSERT INTO categories(name)
VALUES ('Clothing');
INSERT INTO categories(name)
VALUES ('Drinks');