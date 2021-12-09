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
  "created_at" date NOT NULL,
  "user_id" int REFERENCES users(id),
  "category_id" int REFERENCES "categories" ("id")
);

CREATE TABLE "budgets" (
  "id" SERIAL PRIMARY KEY,
  "amount" money,
  "month" date,
  "user_id" int REFERENCES users(id)
);



INSERT INTO users(first_name,last_name,user_name,email,created_at)
VALUES ('Martin','Wasselet','Maitre-Pangolin','martin.wasselet@gmail.com','2021-12-03');

INSERT INTO categories(name)
VALUES ('Home');
INSERT INTO categories(name)
VALUES ('Drinks');
INSERT INTO categories(name)
VALUES ('Groceries');

INSERT INTO expenses(name,created_at,user_id)
VALUES ('Loyer','2021-12-05',1);

select * from users;
select * from categories;
select * from expenses;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO grisbi_admin;