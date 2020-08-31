const queryBuilder = require('../services/queryBuilder');
const Users = require('../models/Users');
const { Client } = require('pg');

;

module.exports = (app) => {
    app.get("/", (req, res)=>{
        res.send("test")
    });

    app.get('/api/users/',(req, res) => {
        const user = new Users();
        user.create("test2", "rd", "rd", "mail@gmail.com", true, "111112")
        const q = new queryBuilder();
        const qq = q.build(user.payload, "select", "users");
        const client = new Client({    
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASS,
            host: process.env.POSTGRES_HOST,
            port: 5432,
            database: "potatoe-stg"
        });
        client.connect()
        .then(() => console.log("connected to dadabase"))
        .then(() => client.query(qq))
        .then((result) => res.send(result.rows))
        .catch((e) => console.log(e))
        .finally(() => client.end())
        
        
    });
};