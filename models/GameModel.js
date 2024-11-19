const {Schema,model}  = require('mongoose')

const gameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum:["Arcade","Shooting","Action","Racing","Sports","Puzzle","Multiplayer","Adventure"],
        required: true
    },
    releaseDate: { 
        type: Date 
    },
    imgUrl: {
     type: String 
    },

});


//Create the Games Model
const Games = model('games', gameSchema);
module.exports = Games 
