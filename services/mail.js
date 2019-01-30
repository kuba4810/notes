const mailTemplate = require('./emailTemplates/registerTemplate');
const registerTemplate = require('./emailTemplates/resetPasswordTemplate');
const nodemailer = require('nodemailer');
const keys = require('../config/keys');


// Transporter settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: keys.mail,
    pass: keys.mailPassword
  }
});

// ----------------------------------------------------------------------------

// Send welcome E-mail
// ----------------------------------------------
async function sendMail(user) {

  var mailOptions = {
    from: 'Twoje notatki',
    to: user.mail,
    subject: 'Dziękujemy za rejestracje !',
    html: mailTemplate(user)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return 'Failed'
    } else {
      return 'Success'
    }
  });
}

// Send reset code
// ----------------------------------------------
async function sendResetCode(data) {
  var mailOptions = {
    from: 'Twoje notatki',
    to: data.mail,
    subject: 'Resetowanie hasła',
    html: registerTemplate(data)
  };

  return Promise.resolve().then(()=>{
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return 'failed'
      } else {
        return 'success'
      }
    });
  })
}

module.exports = {
  sendMail: sendMail,
  sendResetCode: sendResetCode
}