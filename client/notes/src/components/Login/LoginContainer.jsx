import React, { Component } from 'react';
import history from '../../services/history';
class LoginContainer extends Component {
    state = {
        login: '',
        password: '',
        loginMessage : ''
    }
    componentWillMount(){
        if(localStorage.getItem('id')){
            history.push('/notatki');
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Login function
    // Send request to API /api/login
    logIn = async  () => {

        // Clear login message
        this.setState({
            loginMessage : ''
        })

        // Prepare data object
        let data = {
            login : this.state.login,
            password : this.state.password
        }

        try{
            // Request to API
            let response  = await fetch('http://localhost:8080/api/login',{
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin", //
             
                body: JSON.stringify(data), 
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Get response body
            response =  await response.json();

            // Check login result
            if(response.response === 'success'){
                this.setState({
                    loginMessage : 'Logowanie przebiegło pomyślnie !'
                });            
                localStorage.setItem('id',response.user._id);
                history.push('/notatki');

                
            }else{
                this.setState({
                    loginMessage : 'Błędny login lub hasło !'
                });
            }
           

        } catch(err){
           alert('Wystąpił błąd, spróbuj ponownie później !')
           console.log(err);
           
        }
        

    }
    render() {
        return (
            <div className="row mainPageContainer f-color-cornsilk">
                <div className="mainPageContent">
                    <div className="animated fadeIn">
                        <div className="col-12 mt-5 mb-0">
                            <h1 className="hlogo text-center w-100"><i class="fas fa-calendar-check"></i></h1>
                        </div>

                        <div className="col-4 loginCol mr-auto ml-auto f-color-dark a-n-5 mt-4">
                            <form className="bg-light p-5 loginForm">
                                {/* Form header */}
                                <h2 >Zaloguj się !</h2>
                                <hr className="bg-dark" />

                                {/* Login */}
                                <div className="form-group ">
                                    <label htmlFor="login">Login lub adres e-mail</label>
                                    <input type="text" name="login"
                                        className="form-control" onChange={this.handleChange} />
                                </div>

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="password">Hasło</label>
                                    <input type="password" name="password"
                                        className="form-control" onChange={this.handleChange} />
                                </div>
                             

                                {/* Button */}
                                <div className="form-group">
                                    <div 
                                        className="btn btn-warning form-control"
                                        onClick={this.logIn}>
                                        Zaloguj
                                    </div>
                                </div>

                                <div className="form-group text-center">
                                    <label> {this.state.loginMessage} </label>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default LoginContainer;