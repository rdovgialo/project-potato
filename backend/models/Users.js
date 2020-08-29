d = new Date()
class Users{
    constructor(){
        this.payload = {}
        this.date = `${d.getFullYear()}-${(d.getMonth() + 1)}-${d.getDate()}`
    }
    create(display_name, first_name, last_name, email, active, google_id){
        this.payload = {
            display_name: display_name, 
            first_name: first_name,
            last_name: last_name,
            email: email,
            active: active,
            google_id: google_id,
            created_on: this.date
        }
    }
};
module.exports = Users;