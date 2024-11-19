const { Schema, model } = require('mongoose');

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users", // Reference to the Users model
        required: true,
    },
    game: {
        type: Schema.Types.ObjectId,
        ref: "games", // Reference to the Games model 
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1, // Minimum rating value
        max: 5, // Maximum rating value
    },
  
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set to the current date
    },
});

// Create the Review model
const Reviews = model("reviews", ReviewSchema);

module.exports = Reviews;
