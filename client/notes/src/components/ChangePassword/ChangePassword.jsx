import React, { Component } from 'react';
import { log } from 'util';
import history from '../../services/history';
class ChangePassword extends Component {
    state = {
        isCorrectCode : false,
        isLoading : true,
        showMessage : false,
        mail : '',
        password : '',
        confirm_password : '',
        message : ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentWillMount(){
        if(localStorage.getItem('id')){
            history.push('/notatki');
        }
    }

    async componentDidMount(){
        const code = this.props.match.params.code;
        
        try {

            let result = await fetch('http://localhost:8080/api/code-reset/'+code);
             
            result = await result.json();

            console.log('Odpowiedź z serwera: ',result);

            if(result.response === 'failed'){
                console.log('Znaleziony mail ',result);
                
                this.setState({
                    isLoading : false,
                    isCorrectCode : false
                })
            } else {
                console.log('Znaleziony mail ',result);
                this.setState({
                    isLoading : false,
                    isCorrectCode : true,
                    mail : result.mail
                })
            }

            
        } catch (error) {
            console.log(error);
            
        }

    }

    // Login function
    // Send request to API /api/change-password
    changePassword = async () => {

        // Clear login message
        this.setState({
            message: '',
            showMessage : false
        })

        // Prepare data object
        let data = {
            password: this.state.password,
            mail : this.state.mail
        }

        try {
            // Request to API
            let response = await fetch('http://localhost:8080/api/change-password', {
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
            response = await response.json();

            // Check login result
            if (response.response === 'success') {
                this.setState({
                    message: 'Pomyślnie zmieniono hasło !',
                    showMessage : true
                });
                // history.push('/notatki');

            } else {
                alert('Wystąpił błąd, spróbuj ponownie później !')
             }


        } catch (err) {
            alert('Wystąpił błąd, spróbuj ponownie później !')
            console.log(err);

        }
    }

    render() {
        return (
            <div className="row mainPageContainer f-color-cornsilk">
                <div className="mainPageContent">

                    {/* Logo */}
                    <div className="col-12 mt-2 mb-0 animated fadeIn">
                        <h1 className="hlogo text-center w-100">
                            <i class="fas fa-calendar-check"></i>
                        </h1>
                    </div>

                    {/* Form */}
                    <div className="col-lg-5 col-md-8 col-sm-10 mr-auto ml-auto mt-4 animated fadeIn">
                        {
                            // Is code correct 
                            (!this.state.isLoading && !this.state.isCorrectCode) ?

                            // Is not
                            <form action="javascript:void(0);" className="bg-light p-5 resetForm  text-center f-color-dark">
                                <h3>Kod weryfikacyjny jest <span className="text-danger">nieprawidłowy</span> !</h3>
                            </form>
                             :

                            // Is correct
                            <form action="javascript:void(0);" className="bg-light p-5 resetForm  f-color-dark">
                            <h3 className="f-color-dark text-center">
                                Zmień hasło
                             </h3>
                            <hr />

                            {/* New password */}
                            <div className="form-group">

                                <label htmlFor="password">Nowe hasło </label>

                                <input name="password" type="password" className="form-control"
                                    onChange={this.handleChange} />
                            </div>

                            {/* Confirm password */}
                            <div className="form-group">
                                <label htmlFor="confirm_password">Powtórz hasło</label>
                                <input type="password" className="form-control" name="confirm_password"
                                onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-warning form-control mt-3"
                                    onClick={this.changePassword}>
                                    Zmień
                                </button>
                            </div>

                            {
                                this.state.showMessage &&
                                <div className="form-froup">
                                    <div className={"alert alert-success"}>
                                        {this.state.message}
                                    </div>
                                </div>
                            }


                        </form>
                        }
                    </div>


                </div>
            </div>
        );
    }
}

export default ChangePassword;