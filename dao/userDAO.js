const UserModel = require('../models/User');


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

module.exports = {
    createNew: createNew,
    findUser: findUser,
    findUserByMail : findUserByMail,
    findUserByLogin : findUserByLogin
};