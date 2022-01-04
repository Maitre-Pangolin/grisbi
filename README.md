# [GRI$BI](https://grisbi.herokuapp.com/)

A full-stack expense tracking PERN application.

## Technologies
<div>
<img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' width=50 height=50>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width=50 height=50>
<img src='https://camo.githubusercontent.com/bf32d0a71c170dbdb203c201579564f2cd7fc54a24720faad61af12c9605c6b5/68747470733a2f2f7265616374747261696e696e672e636f6d2f72656163742d726f757465722f616e64726f69642d6368726f6d652d313434783134342e706e67' width=50 height=50>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" width="50" height="50">
<img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' width="50" height="50">
<img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' width="50" height="50">
</div>

**Front-End**

* React (create-react-app)
* React-router v6
* Redux (RTK)
* Axios
* Material-UI
* Chart.js

**Back-End**

* Node
* Express
* Postgres
* bcrypt
* jsonwebtoken
* Swagger/OpenAPI

**Details** 
    * JWT Authentification

  
## Deployement

Deployement through heroku, adapted from : https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/

``` 
git push heroku master 
```
Postgres DB Migration :

```
heroku pg:push <db> DATABASE_URL --app <app> 
```

