const queryBuilder = require('../services/queryBuilder');
const Users = require('../models/Users');
const { Client } = require('pg');

const user = new Users();
user.create("test2", "rd", "rd", "mail@gmail.com", true, "111112")
const q = new queryBuilder(user.payload, "select", "users");

module.exports = (app) => {
    app.get("/", (req, res)=>{
        res.send("test")
    });

    app.get('/api/users/',(req, res) => {
        console.log(q.query);
        const client = new Client({    
            user: "postgres",
            password: "Pot2to3+",
            host: "localhost",
            port: 5432,
            database: "potatoe-stg"
        });
        client.connect()
        .then(() => console.log("connected to dadabase"))
        .then(() => client.query("SELECT * FROM users;"))
        .then((result) => res.send(result.rows))
        .catch((e) => console.log(e))
        .finally(() => client.end())
        
        
    });
};