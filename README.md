# `GOOSE_RELOADED`

## How to user the App
GOOSE_RELOADED is a website which allows users to save data regarding their reload parameters.

Firstly a user will need to login or signup, where they will be directed to the home page, which shows their total reloads and a button which will allow them to to go to their relad page. 

On the reload page is the total amount of reloads the user has and the button to add more a new reload. The reload button will navigate the user to a form, in which they can input all their reloading data.

---

## To run the app on your local machine
### To run the fontend
```
npm start
```

### To start the express server, navigate to the server folder
```
cd server
npm start
```

---
## Security measures
Helmet.js has been used on the server to add an extra layer of protection.

With regard to storing user's passwords, they are hashed using the bycrptjs libary, which will ensure in the case of a data beach, user's will have enough time to change their passwords.

---
## Backend Deployment
The back end has been deployed along side the frontend on to Vercel.

This will allow for a simple deployment, it will have imporved preformance as there will be less latency when users make requests to the server, due to data traveling with in the server, oppsed to over the internet and the front and backend can communicate direclty with each other as they do not need to go through API's or external networks.

___

## Admin user
user name: adminuser@gmail.com

password: #Workz123

This will allow you to see the admin access of the application

## Normal user
user name: normaluser@gmail.com

password: Mhip178!

___

## Links
Github: https://github.com/bengraham-B/L3T16

Vercel: https://l3-t16.vercel.app/auth/login

Postman: https://www.postman.com/dark-astronaut-547911/workspace/hyperiondev-level-3/collection/26299671-80d66138-73e3-45ba-9e3f-05a65bf3e88f

Draw.io wireframe: https://app.diagrams.net/#Hbengraham-B%2FL3T16%2Fmain%2FGOOSE_RELOADED%20Diagram.drawio

Redarding the deployment of the app, I was told that it is nologer a requirement for the task. 


___

## MongoDB
The databse is GOOSE_RELOADED

