import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { log } from 'util';
class MainHeader extends Component {
    state = {}

    logout = () =>{
        localStorage.removeItem('id');
    }
    render() {
        console.log(localStorage.getItem('id'));

        return (
            <div className="row main-header  f-color-cornsilk">
                {/* Logo */}
                <div className="col-7">
                    <Link className="linkToMainPage" to={'/'}>
                        <h1 className="letter-spacing-5 w-25">
                            {/* <i class="fas fa-sticky-note"></i> */}
                            {/* <i class="fas fa-tasks"></i>  */}
                            <i className="fas fa-calendar-check"></i>
                            Notes
                    </h1>
                    </Link>
                </div>

                {/* Buttons */}

                <div className="col-5 flex-a-center">
                    {
                        !localStorage.getItem('id') &&
                        < div >
                            <Link to={'/logowanie'}> Zaloguj </Link>
                            <Link to={'/rejestracja'}> Zarejestruj </Link>
                        </div>
                     }
                     {
                           localStorage.getItem('id') &&
                           <Link to={'/'} onClick={this.logout}> 
                                Wyloguj
                           </Link>
                     }

                </div>
            </div>
        );
    }
}

export default MainHeader;