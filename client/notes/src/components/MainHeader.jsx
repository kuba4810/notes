import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class MainHeader extends Component {
    state = {}
    render() {
        return (
            <div className="row main-header bg-warning f-color-cornsilk">
                {/* Logo */}
                <div className="col-7">
                    <Link class="linkToMainPage" to={'/'}>
                        <h1 className="letter-spacing-5 w-25">
                            {/* <i class="fas fa-sticky-note"></i> */}
                            {/* <i class="fas fa-tasks"></i>  */}
                            <i class="fas fa-calendar-check"></i>
                            Notes
                    </h1>
                    </Link>
                </div>

                {/* Buttons */}
                <div className="col-5 flex-a-center">
                    <Link to={'/logowanie'}> Zaloguj </Link>
                    <Link to={'/rejestracja'}> Zarejestruj </Link>
                </div>
            </div>
        );
    }
}

export default MainHeader;