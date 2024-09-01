const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    title: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    address: String , 
    photos:[String],
    description: String,
    perks: [String],
    extraInfo : String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price:Number,
});
//now creating the model
const PlaceModel = mongoose.model('Place',placeSchema);

//now i can add an endpoint for fetching places


module.exports = PlaceModel; 