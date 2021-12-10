
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
VALUES ('Drinks');
INSERT INTO categories(name)
VALUES ('Groceries');

INSERT INTO expenses(name,amount,date,user_id)
VALUES ('Loyer',100,'2021-12-05',1);


