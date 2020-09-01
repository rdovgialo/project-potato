d = new Date()
class Recipe{
    constructor(description, title, prep_time, author){
        const date = `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()}`;
        this.data = {
            description : description,
            title : title,
            preparation_time : prep_time,
            created_on : date,
            author : author
        };


    };

};

module.exports = Recipe;