import React, { Component } from 'react';
class LoginContainer extends Component {
    state = {}
    render() {
        return (



            <div className="col-4 mr-auto ml-auto f-color-dark">
                <form className="bg-light  p-5">
                    <h2 >Zaloguj się !</h2>
                    <hr className="bg-dark" />
                    <div className="form-group ">
                        <label htmlFor="login">Login lub adres e-mail</label>
                        <input type="text" name="login" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" name="password" className="form-control" />
                    </div>

                    <div className="form-group">
                        <div className="btn  btn-warning form-control">Zaloguj</div>
                    </div>

                </form>
            </div>


        );
    }
}

export default LoginContainer;