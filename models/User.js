const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    mail : String,
    login : String,
    password : String
});

const UserModel = mongoose.model('users',userSchema);

module.exports = UserModel;