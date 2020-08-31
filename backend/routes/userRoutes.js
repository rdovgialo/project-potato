const queryBuilder = require('../services/queryBuilder');
const Users = require('../models/Users');
const { Pool } = require('pg');

const pool = new Pool({    
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: "potatoe-stg"
});
const user = new Users();
const q = new queryBuilder();

module.exports = (app) => {
    app.get("/", (req, res)=>{
        res.send("test")
    });

    app.get('/api/users/',(req, res) => {
        const query = q.build("", "select", "users");

        pool.connect((err, client, done) => {
            if (err) throw err;
            client.query(query, (err, result) => {
                done();
                if (err) {
                    console.log(err.stack)
                }else{
                    res.send(result.rows)
                }
            });
        });
 
    });

    app.post('/api/users/newuser/', (req, res) => {
        data = req.query;
        user.create(data.username, data.first_name, data.last_name, data.email, true, data.google_id)
        const query = q.build(user.payload, "post", "users");
        
        pool.connect((err, client, done) => {
            if (err) throw err;
            client.query(query, (err, result) => {
                done();
                if (err) {
                    res.send(err.stack)
                }else{
                    res.send(`new user ${user.payload.display_name} crearted`)
                }
            });
        });
    })

    app.post('/api/users/update_user/', (req, res) => {
        res.send("curently no logic for user updates")
    })
};