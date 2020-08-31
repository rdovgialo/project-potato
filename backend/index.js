const express = require("express");
require('dotenv').config();
const queryBuilder = require('./services/queryBuilder');
const User = require('./models/Users')
const app = express();
//MIDDLEWARES
//app.use()

//Connect to DB
//const user = new User();
//user.create("testUser1", "Ricardas", "Dovgialo", "ricardasmykolasd@gmail.com", true, "1111111111111");
//const query = new queryBuilder();
//query.build(user.payload, "post", "users");
//query.build(user.payload, "select", "users");
//const db = new databaseConnector(query.query);
//db.connect();

//ROUTES
require("./routes/defoultRoutes")(app);


app.listen(5000);