import React, { Component } from 'react';
import history from '../../services/history';
class PasswordReset extends Component {
    state = {
        mail: '',
        isLoading: false,
        responseMessage: '',
        messageType: 'danger',
        showMessage: false
    }

    // Handle input change
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentWillMount(){
        if(localStorage.getItem('id')){
            history.push('/notatki');
        }
    }

    // Send form
    sendForm = async () => {
        // Clear message and set isLoading
        this.setState({
            isLoading: true,
            responseMessage: '',
            showMessage: false
        })

        // Prepare data object
        const data = {
            mail: this.state.mail
        }

        try {
            // Request to API
            let response = await fetch('http://localhost:8080/api/reset-password', {
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
            console.log(response);
            // Check login result
            if (response.response === 'success') {


                this.setState({
                    responseMessage: response.message,
                    isLoading: false,
                    showMessage: true,
                    messageType: 'success'
                });

            } else if (response.response = 'failed') {
                this.setState({
                    responseMessage: response.message,
                    isLoading: false,
                    showMessage: true,
                    messageType: 'danger'
                });
            } else if (response.response = 'server-failed') {
                alert('Wystąpił błąd, spróbuj ponownie później !');
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

                        <form action="javascript:void(0);" className="bg-light p-5 resetForm">

                            <h3 className="f-color-dark text-center">
                                Resetuj hasło
                            </h3>
                            <hr />

                            <div className="form-group f-color-dark">
                                <label htmlFor="mail">Adres e-mail</label>
                                <input name="mail" type="mail" className="form-control"
                                    onChange={this.handleChange} />
                                <button
                                    className="btn btn-warning form-control mt-3"
                                    onClick={this.sendForm}>
                                    Resetuj
                                </button>
                            </div>

                            {
                                this.state.showMessage &&
                                <div className="form-froup">
                                    <div className={"alert alert-" + this.state.messageType}>
                                        {this.state.responseMessage}
                                    </div>
                                </div>
                            }


                        </form>
                    </div>


                </div>
            </div>
        );
    }
}

export default PasswordReset;