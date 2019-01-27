import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class MainHeader extends Component {
    state = {}
    render() {
        return (<div className="row main-header bg-warning f-color-cornsilk height-10">
            {/* Logo */}
            <div className="col-7 text-center flex-a-center">
                <h1 className="letter-spacing-5 w-25"> <i class="fas fa-sticky-note"></i> Notes  </h1>
            </div>

            {/* Buttons */}
            <div className="col-5 flex-a-center">
                <Link to={'/logowanie'}> Zaloguj </Link>
                <Link to={'/rejestracja'}> Zarejestruj </Link>
            </div>
        </div>);
    }
}

export default MainHeader;