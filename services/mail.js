const mailTemplate = require('./emailTemplates/registerTemplate');
const nodemailer = require('nodemailer');

async function sendMail(user){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'zespol.notatki@gmail.com',
          pass: 'notatki100'
        }
      });
      
      var mailOptions = {
        from: 'Twoje notatki',
        to: user.mail,
        subject: 'Dziękujemy za rejestracje !',
        html: mailTemplate(user)
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
          return 'Failed'
        } else {
          return 'Success'
        }
      });
}

module.exports = {
    sendMail : sendMail
}