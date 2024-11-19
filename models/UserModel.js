const {Schema,model}  = require('mongoose')


const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        required: true,
    },

})

//Create the Users Model
const Users = model("users" ,UserSchema)
module.exports = Users



