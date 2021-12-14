# GRI$BI DEVLOG

Gri$bi will be my first full-fledged PERN app, it will hopefully summarize most of what I've learned about web dev in 2021.

Goal is to build an expense & budget tracking app with the following functionnality:

* User account creation login / signup with JWT 
* CRUD operations on expenses and monthly budget
* SPA Front-end using React-Redux RTK , react-router and Material-UI.
* REST API Node/Express
* Data remanence with PostGresSQL 
* Deployement via Heroku

*Additional*
* Write test suite for practice
* Document API Swagger OpticMiddleware ?
* Sign-up/in through google / github 
* Use Chart.js or D3 for visualization
* Build another app with MongoDb (MERN) and using websocket

Let's get to work !

<img src='https://media.giphy.com/media/neffXsHmkBieY/giphy.gif' width=400></img>


## 2021-12-08

 First day on project, a fair share of the front-end was previously developed but need a large refactoring, I will get to that later.

 First let's init the project and repo.

 For now it should have the following structure :

* Client
    * TBD
* Server
  *  app.js
  *  api
     *  routes
        *  index.js
     *  middleware
        *  index.js
     *  controllers
  * config
    * index.js
  * loaders
    * express.js
    * db.js
    * logger.js
    * index.js

This is inspired by [bullet-proof-node](https://github.com/Maitre-Pangolin/bulletproof-nodejs) and [node-pg](https://node-postgres.com/guides/async-express) architecture.

Adding dotenv package
For logger, I'm using simple console.log for now

Implemented basic folder structure.
Validated basic server functionnaility with initial loader and config.

Break for lunch need to implement DB connection after.

Installed pg (node-postgres)

Having trouble setting up the db ... Issue with permissions

Using this [reference](https://medium.com/coding-blocks/creating-user-database-and-adding-access-on-postgresql-8bfcd2f4a91e), to create new user and db and grant privileges  

Still permissions issue despite granting all privileges to newly created user ...

Used this after table creation ```GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myeuser;``` . This has something to do with the schemas within the db not having the right permissions, I guess it does not propagate ? Seems weird, definitely had an easier time using/setting up MongoDB

<img src='https://media.giphy.com/media/YVPwi7L2izTJS/giphy.gif' width=400>

Run a select query, everything seems to work, I'm not super clear regarding Pool vs Client and how to performs validation on my db connection. I guess I should write test ?

Added a connectionValidation called at logging to check pool credentials.

## 2021-12-09

Let's work on the api, CRUD operations on expenses + monthly expense selection + totals per months.

Setting up db layer =>controllers=>routes

Issue with the privileges, now on the sequence for id creation, modified sql init script.

DB expense creation works, need to fix some async/await for proper controller logic.

Logic fixed, missed a return statement.

First route functionnal ! 👍
<img src='https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif' width=400>

Fixed input for now, need to use request body on expense creation.

**User id should be retrieve through some sort of auth middleware, first time doing this , I guess I should use JWT , needs to brush up on this / find use case**

Improved route error handling to propagate errors to express error handlers.

Added body-parser and cors.

Create expense working through Postman with json request body populated.

Lunch break !

[JWT Token Video From Dev Ed](https://www.youtube.com/watch?v=2jqok-WgelI)

Password encryption through bcryptjs and JWT implementation using jsonwebtoken 

Created sample data for users with encrypted password, on to users signup and login route creation.

Created login route, with password encryption validation using bcrypt , and sending a JWT containing the user id if credentials are accepted.

BREAK To do next, create a sign-up route and a protected route that require authentification.

Sign up route created with password encryption.

## 2021-12-10

Brand new day, let's create a protected route and build a middleware to check for proper authentification i.e presence of a valid JWT in header.

Should maybe create an extended error class to include status code at creation for better readability , DRYness. Let's think about refactoring

Authentification middleware functionnal , protected route works as intented.

Time to refactor some of the error handling, too verbose. 

Created a ServerError class, handling in the express error handler. Should be straightforward to extend functionnality & handling logic.

Refactored my console.logger to include any number of ...args

Let's create fake expenses for at least two users and spanning three not contiguous months.


SHOULD REFACTOR CONTROLLERS DB CALL => DRY 

Should modify http res status.

Implemented put and delete on expenses and refactored some routes

Initialized front-end

## 2021-12-13

Worked on resume / Github / Linkedin

Installed front-end dependencies