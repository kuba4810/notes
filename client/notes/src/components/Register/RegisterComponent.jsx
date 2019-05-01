import React, { Component } from 'react';
import history from '../../services/history';
class RegisterComponent extends Component {
    state = {
        login: '',
        mail: '',
        password: '',
        registerMessage: ''
    }

    componentWillMount() {
        if (localStorage.getItem('id')) {
            history.push('/notatki');
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // Register function
    // ------------------------------------------------------------------------
    register = async () => {

        // Clear register message
        this.setState({
            registerMessage: ''
        })

        // Prepare data object
        let data = {
            mail: this.state.mail,
            login: this.state.login,
            password: this.state.password
        }

        // Request to API
        try {
            let res = await fetch('http://localhost:8080/api/register', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin", //

                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            res = await res.json();
            // Check response
            if (res.response === 'failed') {
                this.setState({
                    registerMessage: res.message
                })
            }
            // If success
            else {
                this.setState({
                    registerMessage: 'Rejestracja przebiegła pomyślnie, możesz się zalogować !'
                })

                setTimeout(() => {
                    history.push('/logowanie');
                }, 1500)
            }

        } catch (error) {
            alert('Wystąpił błąd, spróbuj ponownie później !')
            console.log(error);
        }


    }

    render() {
        return (

            <div className="row mainPageContainer f-color-cornsilk">
                <div className="mainPageContent">
                    <div className="animated fadeIn">
                        <div className="col-lg-4 col-md-8 col-sm-10 mt-2 mb-0 ml-auto mr-auto">
                            <h1 className="hlogo text-center w-100"><i class="fas fa-calendar-check"></i></h1>
                        </div>

                        <div className="col-4 registerCol mr-auto ml-auto f-color-dark  a-n-5 mt-3">
                            <form className="bg-light p-5 registerForm">
                                {/* Form header */}
                                <h2 >Zarejestruj się się !</h2>
                                <hr className="bg-dark" />

                                {/* E-mail */}
                                <div className="form-group">
                                    <label htmlFor="mail">Adres e-mail</label>
                                    <input type="text" name="mail" className="form-control"
                                        onChange={this.handleChange} />
                                </div>

                                {/* Login */}
                                <div className="form-group ">
                                    <label htmlFor="login">Login</label>
                                    <input type="text" name="login" className="form-control"
                                        onChange={this.handleChange} />
                                </div>

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="password">Hasło</label>
                                    <input type="password" name="password" className="form-control"
                                        onChange={this.handleChange} />
                                </div>

                                {/* Button */}
                                <div className="form-group">
                                    <div className="btn  btn-warning form-control"
                                        onClick={this.register}>
                                        Zarejestruj
                                    </div>
                                </div>

                                {
                                    this.state.registerMessage.length > 0 && 
                                    <div className="form-group text-center">
                                        <label>
                                             {this.state.registerMessage}
                                        </label>
                                    </div>
                                }

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;