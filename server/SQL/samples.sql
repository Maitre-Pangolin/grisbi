
/*User Sample*/
DELETE FROM users;
DELETE FROM categories;
DELETE FROM expenses;

/*123456*/
INSERT INTO users(first_name,last_name,user_name,email,password,created_at)
VALUES ('Martin','Wasselet','Maitre-Pangolin','martin.wasselet@gmail.com','$2a$10$8CJ0sb/04FGreEcuvoPPAuXVR0vru4Qqapv3dQrENCLCO.pn0nzEm','2021-10-03');

/*carrotCake*/

INSERT INTO users(first_name,last_name,user_name,email,password,created_at)
VALUES ('Bernie','Sanders','TheRealBernie','bernie@freesbee.com','$2a$10$jt.gixqXYLSbI7yms1m0wuDQRnjRwoiett.8QFy8nDfBC30G/frxK',NOW());


/*bonjour*/

INSERT INTO users(first_name,last_name,user_name,email,password,created_at)
VALUES ('Walter','White','BlueKing','methisrad@gmail.com','$2a$10$dHXsb9Yo/NKokqk851ukput7garWapH8eHpHrLKbvKiUEOUS.uwXG','883-05-03');


/*Category Sample*/

INSERT INTO categories(name)
VALUES ('Miscellaneous');
INSERT INTO categories(name)
VALUES ('Home');
INSERT INTO categories(name)
VALUES ('Drinks');
INSERT INTO categories(name)
VALUES ('Groceries');

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Loyer',700,'2021-12-05','2021-12',2);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Groceries',87.2,'2021-12-06','2021-12',4);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Birra',87.2,'2021-12-08','2021-12',3);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Ampoules',87.2,'2021-12-03','2021-12',1);


INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (2,'Loyer',750,'2021-12-05','2021-12',2);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (2,'Groceries',44,'2021-12-06','2021-12',4);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (2,'Phone bill',54.2,'2021-12-06','2021-12',4);


INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Loyer',700,'2021-11-05','2021-11',2);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Groceries',87.2,'2021-11-06','2021-11',4);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Birra',87.2,'2021-07-08','2021-07',3);

INSERT INTO expenses(user_id,name,amount,date,key_month,category_id)
VALUES (1,'Ampoules',87.2,'2021-07-02','2021-07',1);
