const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    mail : String,
    login : String,
    password : String,
    mail_confirmed : false
});

const UserModel = mongoose.model('users',userSchema);

module.exports = UserModel;