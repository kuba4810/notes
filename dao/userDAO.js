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
                mail: login,
                password: password
            }]

        });
    });
}

// Find user by mail
// ----------------------------------------------
async function findUserByMail(mail) {
    return Promise.resolve().then(() => {
        return UserModel.findOne({
            mail: mail
        })
    })
}

// Find user by login
// ----------------------------------------------
async function findUserByLogin(login) {
    return Promise.resolve().then(() => {
        return UserModel.findOne({
            login: login
        });
    })
}

// Check if mail is confirmed
// ----------------------------------------------
async function isMailConfirmed(mail) {

    const user = await UserModel.findOne({
        mail: mail
    });

    return user.mail_confirmed;
}

// Generate code for password reset
// ----------------------------------------------
async function generateCode(mail) {

    // Prepare data
    const code = randomstring.generate(20);
    const data = {
        code: code,
        mail: mail
    }

    // Check if document exists
    const code_document = await CodeModel.findOne({
        mail: mail
    })

    // If not, create one
    if (!code_document) {
        return Promise.resolve().then(() => {
            return new CodeModel(data).save();
        });

        // Else delete and create new
    } else {
        const res = await CodeModel.deleteMany({
            mail: mail
        })

        if (res) {
            return Promise.resolve().then(() => {
                return new CodeModel(data).save();
            });
        }
    }
}

// Check if sent code for password change exists
// ------------------------------------------
async function checkCode(code) {
    return Promise.resolve().then(() => {
        return CodeModel.findOne({
            code: code
        });
    });
}

// Update password
// ----------------------------------------------
async function updatePassword(id, password) {
    return Promise.resolve().then(() => {
        return UserModel.findByIdAndUpdate(id, {
            password: password
        });
    });
}

// Add label
// ----------------------------------------------
async function addLabel(id, label) {

    console.log('DAO : ', label)

    let user = await UserModel.findById(id);
    let labels = user.labels;
    labels.push(label);

    await UserModel.findByIdAndUpdate(id, {
        labels: labels
    })
    return labels
}

// Delete label
// ----------------------------------------------
async function deleteLabel(user_id, label_id) {

    let user = await UserModel.findById(user_id);
    let labels = user.labels;

    labels = labels.filter(label => (

        label.label_id !== label_id

    ));

    await UserModel.findByIdAndUpdate(user_id, {
        labels: labels
    })
    return labels
}

// Edit label
// ----------------------------------------------
async function editLabel(user_id, label_id, title) {

    console.log('DAO : ',title,label_id);

    let user = await UserModel.findById(user_id);
    let labels = user.labels;

    labels = await labels.map(label => {

        if (label.label_id === label_id) {
           
            return Object.assign({},label,{
                title : title
            })

        } else {
            return label;
        }

    });

    console.log('DAO EDIT LABEL :',labels);

    await UserModel.findByIdAndUpdate(user_id, {
        labels: labels
    })
    return labels
}

// Get labels
// ----------------------------------------------
async function getLabels(user_id) {

    let user = await UserModel.findById(user_id);

    let labels = user.labels;

    return labels;

}

module.exports = {
    createNew: createNew,
    findUser: findUser,
    findUserByMail: findUserByMail,
    findUserByLogin: findUserByLogin,
    isMailConfirmed: isMailConfirmed,
    generateCode: generateCode,
    checkCode: checkCode,
    updatePassword: updatePassword,
    addLabel: addLabel,
    deleteLabel: deleteLabel,
    editLabel : editLabel,
    getLabels: getLabels
};