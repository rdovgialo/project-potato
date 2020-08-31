const { Client, Pool } = require('pg')

const d = new Date()

const client = new Client({
    user: "postgres",
    password: "Pot2to3+",
    host: "localhost",
    port: 5432,
    database: "potatoe-stg"
});

class DatabaseConnector {
    constructor() {
        this.date = d.toISOString();
        this.data = "";
    };

    async get(query){
        client.connect()
        .then(() => console.log("connected to database"))
        .then(() => {
            console.log(query);
            client.query(query);})
        .then(results => {
            console.log(results)
            return results;
        })
        .catch(e => console.log(e))
        .finally(() => {
            console.log("killing connection")
            client.end()});
    };

}

module.exports = DatabaseConnector