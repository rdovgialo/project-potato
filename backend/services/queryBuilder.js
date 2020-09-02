class QueryBuilder{
    constructor(){
        this.query = "";
    }
    build(data, action, table){
        if (action == "post"){
            const data_keys = Object.keys(data).join(', ');
            const data_values = Object.values(data);
            let value_string = ""
            for (var i = 0; i < data_values.length; i++) {
                if (i == 0){
                    value_string = `'${data_values[i]}'`
                }else{
                    value_string = value_string + ` ,'${data_values[i]}'`
                }
            }
            const queryString = `INSERT INTO ${table} (${data_keys}) VALUES (${value_string});`;
            return queryString;
        };
        if (action == "select"){
            const queryString = `SELECT * FROM ${table};`;
            return queryString;
        };
        if( action == "byName"){
            //const queryString = `SELECT * FROM ${table} WHERE title = '${data.name}';`;
            const queryString = `SELECT * FROM ${table} WHERE ${table}_id = 1;`;
            return queryString;
        }
    };
};

module.exports = QueryBuilder;