import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Header extends Component {
    state = {}
    render() {
        return (
            <div className="row">

                <div className="col-12 menu bg-dark f-color-cornsilk text-left d-flex ">

                    <Link to={'/notatki'} className="f-color-cornsilk pr-5 flex-a-center">
                        <i class="fas fa-sticky-note mr-2"></i> Notatki
                </Link>

                    <Link to={'/harmonogram'} className="f-color-cornsilk pr-5  flex-a-center" >
                        <i class="fas fa-calendar-alt mr-2"></i>  Harmonogram
                </Link>

                    <Link to={'/profil'} className="f-color-cornsilk  flex-a-center" >
                        <i class="fas fa-user mr-2"></i>  Profil
                </Link>

                </div>
            </div>
        );
    }
}

export default Header;