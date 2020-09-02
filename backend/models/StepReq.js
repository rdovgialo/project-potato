class StepReq{
    constructor(ingredient_id, recipe_id, amount, mesurement){
        this.data = {
            step_id: recipe_id ,// this is not needed, need to remove that from db schema this should be recipe ID
            ingredient_id: ingredient_id
        }
        if (mesurement == "g"){this.data.amount_grams = amount}else{if(mesurement =="ml"){this.data.amount_milileters = amount}};
    }
};
module.exports = StepReq;