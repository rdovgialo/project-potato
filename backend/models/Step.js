class Step{
    constructor(recipe_id, content, title, index){
        const date = `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()}`;
        this.data = {
            recipe_id: recipe_id,
            content : content,
            title: title,
            created_on: date,
            index: index
        }
    };
};

module.exports = Step;