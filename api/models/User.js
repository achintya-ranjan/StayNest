const mongoose = require('mongoose');
const {Schema} = mongoose; //Extracts the Schema property from the mongoose object and assigns it to the Schema variable. 
//By doing this, you can directly use Schema in your code without needing to reference it as mongoose.Schema each time.


const UserSchema = new Schema({ //defining the schema ofr our model
    name:  String,
    email: {type:String,unique:true} ,//adding more defin, the email should be unique
    password: String,
});

const UserModel = mongoose.model('User' , UserSchema);

module.exports = UserModel;//now, to export our user model

//User.js = Mongoose model that allows to interact with the 'user' collection 
// we use Mongoose model for MongoDB