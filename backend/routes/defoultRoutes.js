const databaseConnector = require('../services/databaseConnector');
const queryBuilder = require('../services/queryBuilder');
const Users = require('../models/Users');

const user = new Users();
user.create("test2", "rd", "rd", "mail@gmail.com", true, "111112")
const q = new queryBuilder(user.payload, "select", "users");

module.exports = (app) => {
    app.get("/", (req, res)=>{
        res.send("test")
    });

    app.get('/api/users/',(req, res) => {
        console.log(q.query);
        const db = new databaseConnector();
        const data = db.get("SELECT * FROM users;")
        .then(() => {res.send(data);});
        
    });
};