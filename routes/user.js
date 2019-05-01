const userDAO = require('../dao/userDAO');
const mailSender = require('../services/mail');
const randomstring = require('randomstring');

module.exports = (app) => {

    // Register
    // -----------------------------------------------------------
    app.post('/api/register', async (request, response) => {
        try {
            let login = true;
            let mail = true;

            // Check if login is available
            let user = await userDAO.findUserByLogin(request.body.login);
            if (user) {
                response.send({
                    response: 'failed',
                    message: 'Ta nazwa użytkownika jest już zajęta !'
                })
                login = false;
            }

            // Check if mail is available
            if (login) {
                user = await userDAO.findUserByMail(request.body.mail);
                if (user) {
                    response.send({
                        response: 'failed',
                        message: 'Ten mail jest już zajęty !'
                    })
                    mail = false;
                }
            }

            // Create new user if login and mail are available
            if (login && mail) {
                user = await userDAO.createNew(request.body);

                mailSender.sendMail(user);

                if (user) {
                    response.send({
                        response: 'success',
                        user: user
                    });
                }
            }

        } catch (err) {

            response.send({
                response: 'failed',
                message: err
            })
        }
    });

    // Log In
    // -----------------------------------------------------------
    app.post('/api/login', async (request, response) => {

        let login = request.body.login;
        let password = request.body.password;
        try {
            const user = await userDAO.findUser(login, password);
            if (user) {
                response.send({
                    response: 'success',
                    user: user
                });
            } else {
                response.send({
                    response: 'failed',
                    user: user
                });
            }

        } catch (err) {
            console.log(err);
            response.send({
                response: 'failed',
                message: err
            })
        }
    });

    // Reset password
    // -----------------------------------------------------------
    app.post('/api/reset-password', async (request, response) => {
        console.log('Reset password : ', request.body);

        try {
            // Find user by mail
            const mail_confirmed = await userDAO.isMailConfirmed(request.body.mail);

            if (!mail_confirmed) {
                response.send({
                    response: 'failed',
                    message: 'Adres jest nie potwierdzony ! Na Twój adres został wysłany link aktywacyjny.'
                })
            } else {
                // Generate code
                const code = await userDAO.generateCode(request.body.mail);
                console.log(code);
                
                // Send mail
                const mail_result = await mailSender.sendResetCode({code : code.code,mail : request.body.mail});

                response.send({
                    response: 'success',
                    message: 'Na podany adres wysłano link do zmiany hasła.'
                })

            }
        } catch (error) {
            console.log(error);

            response.send({
                response: 'server-failed'
            })
        }
    });

    // Check code
    // This route checks if code from url exists in database
    // If not it returns proper answer
    // ------------------------------------------------------------------------
    app.get('/api/code-reset/:code', async (request,response)=>{
        console.log('Code reset');
        
        try {
            const code_document = await userDAO.checkCode(request.params.code);

            if(code_document){
                response.send({
                    response : 'success',
                    mail : code_document.mail
                })
            }else{
                response.send({
                    response : 'failed'
                })
            }
        } catch (error) {
            response.send({
                response : 'server-failed'
            })
        }
    });

    // Change password
    // Finds user by mail
    // Gets new password and uptade document in database
    // ------------------------------------------------------------------------
    app.post('/api/change-password',async (request,response)=>{
        console.log(request.body);
        
        try {

            let user = await userDAO.findUserByMail(request.body.mail);

            if(!user){
                response.send({
                    response : 'failed'
                })
            }else{
                const res = await userDAO.updatePassword(user._id,request.body.password);

                 user = await userDAO.findUserByMail(request.body.mail);

                response.send({
                    response : 'success',
                    newPassword : user.password
                })
            }
            
            
        } catch (error) {
            console.log(error);
            
            response.send({
                response : 'failed'
            })
        }
    });

    // ADD LABEL
    // ------------------------------------------------------------------------
    app.post('/api/label', async (request,response) => {

        console.log('New label...', request.body);

        try {

            const label_id = randomstring.generate(15);
            
            const label = {
                label_id : label_id,
                title : request.body.title
            }

            console.log('Prepared label endpoint : ',label)
            
            let res = await userDAO.addLabel(request.body.id,label);

            console.log('LABELS ENDPOINT: ',res)

            response.send({
                response : 'success',
                label_id : label_id
            })


        } catch (error) {
            
            console.log(error);

            response.send({
                response : 'failed'
            })
            

        }
        

    });

    // DELETE LABEL
    // ------------------------------------------------------------------------
    app.post('/api/label/delete', async (request,response) => {

        console.log('Delete label...', request.body);

        try {
            
            let res = await userDAO.deleteLabel(request.body.user_id,request.body.label_id);

            response.send({
                response : 'success',
                labels : res
            })


        } catch (error) {
            
            console.log(error);

            response.send({
                response : 'failed'
            })
            

        }
        

    });

    // EDIT LABEL
    // ------------------------------------------------------------------------
    app.post('/api/label/EDIT', async (request,response) => {

        console.log('label edit (endpoint): ',request.body)
        let data = request.body;

        try {
            
            let res = await userDAO.editLabel(data.user_id,data.label_id,data.title);

            response.send({
                response : 'success',
                labels : res
            })


        } catch (error) {
            
            console.log(error);

            response.send({
                response : 'failed'
            })
            

        }
        

    });

    // GET LABELS
    // ------------------------------------------------------------------------
    app.get('/api/user/labels/:user_id', async (request,response)=>{

        try {

            let labels = await userDAO.getLabels(request.params.user_id);

            response.send({
                response : 'success',
                labels : labels
            })
            
        } catch (error) {
            
            console.log(error);

            response.send({
                response : 'error'
            })

        }

    })

}

