const { Pool } = require('pg');
const queryBuilder = require('../services/queryBuilder');
const Recipe = require('../models/Recipe');

const pool = new Pool({    
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    host: process.env.POSTGRES_HOST,
    port: 5432,
    database: "potatoe-stg"
});

const q = new queryBuilder();

module.exports = (app) => {

    // GET 
    app.get("/api/recipe/all/", (req, res) =>{
        const query = q.build("", "select", "recipe");

        // connect to pool
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

    // POST
    app.post("/api/recipe/post_new/", (req, res)=> {
        const steps = req.body.steps;
        const ingredients = req.body.ingredients;
        const recipe = new Recipe(req.body.description, req.body.title, req.body.prep_time, req.body.author);
        const recipeQuery = q.build(recipe.data, "post", "recipe")
        console.log(recipeQuery)

        //needs a for loop that loops over the querys that need to executed
        pool.connect((err, client, done) => {
            if (err) throw err;
            client.query(recipeQuery, (err, result) => {
                done();
                if (err) {
                    console.log(err.stack)
                };
            });
        });
        res.send("got it !");
    });


};