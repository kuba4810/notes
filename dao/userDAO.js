const UserModel = require('../models/User');
const CodeModel = require('../models/ResetPasswordCode');
const randomstring = require('randomstring');


// Create new user in database
// ----------------------------------------------
async function createNew(user) {
    return Promise.resolve().then(() => {
        return new UserModel(user).save();
    });
}

// Find user by login and password
// ----------------------------------------------
async function findUser(login, password) {
    return Promise.resolve().then(() => {
        return UserModel.findOne({
            $or: [{
                login: login,
                password: password
            }, {
                mail : login,
                password: password
            }]

        });
    });
}

// Find user by mail
// ----------------------------------------------
async function findUserByMail(mail){
    return Promise.resolve().then(()=>{
        return UserModel.findOne({
            mail : mail
        })
    })
}

// Find user by login
// ----------------------------------------------
async function findUserByLogin(login){
    return Promise.resolve().then(()=>{
        return UserModel.findOne({
            login : login
        })
    })
}

// Check if mail is confirmed
// ----------------------------------------------
async function isMailConfirmed(mail){

    const user  = await UserModel.findOne({
        mail : mail
    });

    return user.mail_confirmed;
}

// Generate code for password reset
// ----------------------------------------------
async function generateCode(mail){

    // Prepare data
    const code = randomstring.generate(20);
    const data = {
        code : code,
        mail : mail
    }

    // Check if document exists
    const code_document = await CodeModel.findOne({
        mail : mail
    })

    // If not, create one
    if(!code_document){
        return Promise.resolve().then(()=>{
            return new CodeModel(data).save();
        });

    // Else delete and create new
    } else{
        const res = await CodeModel.deleteMany({
            mail : mail
        })

        if(res){
            return Promise.resolve().then(()=>{
                return new CodeModel(data).save();
            });
        }
    }

}


module.exports = {
    createNew: createNew,
    findUser: findUser,
    findUserByMail : findUserByMail,
    findUserByLogin : findUserByLogin,
    isMailConfirmed : isMailConfirmed,
    generateCode : generateCode
};