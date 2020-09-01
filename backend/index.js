const express = require("express");
require('dotenv').config();
const queryBuilder = require('./services/queryBuilder');
const User = require('./models/Users')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
//MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Connect to DB
//const user = new User();
//user.create("testUser1", "Ricardas", "Dovgialo", "ricardasmykolasd@gmail.com", true, "1111111111111");
//const query = new queryBuilder();
//query.build(user.payload, "post", "users");
//query.build(user.payload, "select", "users");
//const db = new databaseConnector(query.query);
//db.connect();

//ROUTES
require("./routes/userRoutes")(app);
require("./routes/recipeRoutes")(app);


app.listen(5000);