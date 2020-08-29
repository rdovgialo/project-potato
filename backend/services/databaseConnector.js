const { Client } = require('pg')
require("../models/Recipe")

const d = new Date()

class DatabaseConnector {
    constructor(query) {
        this.date = d.toISOString()
        this.query = query
    };
    connect(){
        const client = new Client({
            user: "postgres",
            password: "Pot2to3+",
            host: "localhost",
            port: 5432,
            database: "potatoe-stg"
        });

        client.connect()
        .then(() => console.log("CONNECTED\n\n\n"))
        .then(() => client.query(this.query))
        .then((res) => console.table(res.rows))
        .catch(e => console.log(e))
        .finally(() => client.end())
    };
}

module.exports = DatabaseConnector