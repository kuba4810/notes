import React, { Component } from 'react';
class RegisterComponent extends Component {
    state = {}
    render() {
        return (
            <div className="col-4 mr-auto ml-auto f-color-dark">
                <form className="bg-light  p-5">
                    {/* Form header */}
                    <h2 >Zarejestruj się się !</h2>
                    <hr className="bg-dark" />

                    {/* E-mail */}
                    <div className="form-group">
                        <label htmlFor="mail">Adres e-mail</label>
                        <input type="text" name="mail" className="form-control"/>
                    </div>

                    {/* Login */}
                    <div className="form-group ">
                        <label htmlFor="login">Login</label>
                        <input type="text" name="login" className="form-control" />
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" name="password" className="form-control" />
                    </div>

                    <div className="form-group">
                        <div className="btn  btn-warning form-control">Zarejestruj</div>
                    </div>

                </form>
            </div>
        );
    }
}

export default RegisterComponent;