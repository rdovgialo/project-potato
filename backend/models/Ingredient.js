
class Ingredient{
    constructor(name, caloric_value, product_type){
        this.data = {
            name: name,
            caloric_value: caloric_value,
            product_type: product_type
        };
    }
};

module.exports = Ingredient;