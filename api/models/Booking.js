const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId,  required:true,  ref:'Place'},  // the reference is Place.js
    user : {type:mongoose.Schema.Types.ObjectId,  required:true},
    checkIn: {type:Date , required:true},
    checkOut: {type:Date , required:true},
    name: {type:String , required:true},
    phone: {type:String , required:true},
    prcie: {type:Number , required:true}
});

const BookingModel = mongoose.model('Booking' , bookingSchema);

module.exports = BookingModel;