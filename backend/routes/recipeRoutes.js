const { Pool } = require('pg');
const queryBuilder = require('../services/queryBuilder');
const Recipe = require('../models/Recipe');
const Step = require('../models/Step');
const Ingredient = require('../models/Ingredient');
const StepReq = require('../models/StepReq');

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
        pool.query(query)
        .then(result => {res.send(result.rows)})
        .catch(err => console.log(err))
    });
    app.get("/api/ingredients/all", (req, res) => {
        const query = q.build("", "select", "ingredient");
        pool.query(query)
        .then(result => res.send(result.rows))
    })

    // POST
    app.post("/api/recipe/post_new/", (req, res)=> {
        const steps = req.body.steps;
        const ingredients = req.body.ingredients;
        const recipe = new Recipe(req.body.description, req.body.title, req.body.prep_time, req.body.author);
        const recipeQuery = q.build(recipe.data, "post", "recipe")
        const rq = q.build({name: req.body.title}, "byName", "recipe");

        pool.query(recipeQuery)
        .then( () => pool.query(rq))
        .then( result => {return result.rows[0].recipe_id})
        .then((id) => {
            const query_list = [];
            for(i = 0; i < steps.length; i++){
                console.log(i)
                const step = new Step(id, steps[i].content, steps[i].title, steps[i].index);
                const query = q.build(step.data, "post", "step");
                query_list.push(query)
            };
            for(i = 0; i < ingredients.length; i++){
                const stepReq = new StepReq(ingredients[i].ingredient_id, id, ingredients[i].amount, ingredients[i].mesurement);
                const ingQuery = q.build(stepReq.data, "post", "step_requirement");
                query_list.push(ingQuery)
            };
            return query_list;
        })
        .then((ql)=>{
            const all_step_promises = [];
            for(i = 0; i < ql.length; i++){
                var p = pool.query(ql[i]);
                all_step_promises.push(p);
            }
            return all_step_promises;
        })
        .then((pl)=>{
            Promise.all(pl)
        })
        .then(()=>console.log("all recipe data created"))
        .catch(err => console.log(err));

        res.sendStatus(200);
    });

    app.post("/api/recipe/ingredient_new/", (req, res) =>{
        const ingredient = new Ingredient(req.body.name, req.body.caloric_value, req.body.product_type);
        const query = q.build(ingredient.data, "post", "ingredient")
        pool.query(query)
        .then(()=>console.log("ingredient created"));
        res.sendStatus(200);
    })
};

