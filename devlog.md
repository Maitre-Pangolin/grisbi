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

Installed front-end dependencies.

Brush-up on front-end auth best practices, local vs session storage vs cookies. Auth to redux

Create sign-in form with MUI, need to implements logics.

## 2021-12-14

Sending sign in data in plain text over http post seems like a bad practice. After reading thats a reason https was invented , so need SSL certificate on server-side, this is a story for another time, I should just put a disclaimer for now, saying that this app is for training purpose so use bogus password.

Also password/user can / should also be provided via authorization headers usine BASE64.

Let's create a reducer for user-sign-in.

Component for sign-in and reducer functionnal, need to implement error handling and token stockage.

Remove password from signin res on server side. For now it return nothing except a jwt in header.

Alright, I'm clear on how the whole refresh token vs access token things should be implemented, but still foggy on how to store them in the front localSession vs Cookies, both seems to presents security issue that can only be adressed using https, XSS vulnerability.

Implemented refresh_token in server-side and db storage.
Now for front-end , going to store both token in localStorage for now.

(NEED TO REFORMAT LINK)

Token are now stored in localstorage, need to set up axios interceptor to add auth + automatic refresh. Also need to check for local storage data at refresh (app level useEffect, + redux action on auth ?)

## 2021-12-15

Refactored the auth process on the front-end, added a token service to deal with the local storage interaction. added a logout functionnaility.

Changed routing structure. Added a login form component to be reused. Changed home component and add bar to validate proper login.

Implemented logout route on back-end, fixed issue with multiple refresh token per user allowed in the db. Now unique field, plus delete operation prior to creating and stocking a new refresh token.

Auth process  seems fully functionnal for now! Might be good to add (github, google + logging capability)

Refactoring folder structure for srevices and api.

Validated the access to protected ressources using access token on the fetchExpensesByMonth route . (Now need to implement automatic refresh)

Token expiry works , set to 20s on access for testing.
Automatic refresh on axios interceptor.

SHOULD TEST WHAT HAPPENS ON REFRESH TOKEN EXPIRY => SHOULD LOGOUT AND ASK FOR LOGIN

stop for today.

## 2021-12-16

Creating sign-up form.


Sign up form completed, with error handling on empty form, wrong email format, plus server error handling on duplicate user name or email.

Should add a sign-up completion on successful sign up. Done . Sign up complete.

Going to lunch, let's work on the categories in DB, load categories on app load, and add the 'add expense form' to home => DONE

Next create the expense slice, contains the keyMonth of the month being worked on (by default current month => should be fetched when logged in and accesing home or current month page )

## 2021-12-17

Created expense slice, modified app loading , token validation to logout automaticcaly when no tokens are present or if token is expired or is not present in the DB.

Addex Expense and Expenses components. select total selector.

Need to redirect to proper location on added expense + code delete expense and modify expense logic.

Delete and update function added, with redirection using useNaviagte from react-router

Created route and compoenents for monthly expenses. 

Need to fix categories and category icons. An add an add expense button.

## 2021-12-20

Back from week-end let's add the add expense / return button 

Improve responsivness and  worked on codecademy classes

## 2021-12-23

Worked on codecademy classes on tuesday. Back to the app let's implement budget in db and redux slice.

Covid is that you ? Time for a test ...

Lost all day in a great test queue by -20C , just great ...

## 2021-12-27

4 days later no result, what a superb display of efficiency and organization. 

Implementing server side route for budget and going back to get tested.

## 2021-12-28

Created put and post route for budget. Validated
Had to move for covid isolation, not a super productive last few days...

Implemented monthly summary view.

## 2021-12-29

Fixed issue on expense creation , forgot to update the keyMonth when sending data to the server.

Fixed issue on API routes, root for API needs to start with '/' or they will be preprended to the current route.

Fixed issue on expense creation not displaying proper categories , again an issue with SQL snake_case to camelCase

Add sign-in submission when pressing enter