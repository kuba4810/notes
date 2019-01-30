import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
class NotesContainer extends Component {
    state = {}
    render() {
        return (
            <div className="notesContainer f-color-cornsilk">
                
                <Header />
                <div className="row">
                    <div className="col col-3 notesNavBar bg-secondary f-color-cornsilk pt-3">

                        <h5>Menu</h5>
                        <hr className="bg-light"/>
                        <ul className="mr-auto ml-auto">

                            <li >
                                <Link to={'/notatki'} >
                                    <i class="fas fa-lightbulb mr-1"></i>
                                    Notatki
                                </Link>
                            </li>

                            <li>
                                <Link to={'/notatki/archiwum'}>
                                    <i class="fas fa-history mr-1"></i>
                                    Archiwum
                               </Link>
                            </li>
                            <li>
                                <Link to={'/notatki/kosz'}>
                                    <i class="fas fa-trash-alt mr-1"></i>
                                    Kosz
                                </Link>
                            </li>
                        </ul>

                        
                        <h5>Etykiety</h5>
                        <hr className="bg-light" />
                        <ul className="etiquette ">
                            <li>
                                 <i class="fas fa-plus mr-2"></i> Dodaj etykiete
                            </li>
                        </ul>

                        {/* <hr className="bg-light" /> */}

                    </div>

                    <div className="col col-9 height-85  f-color-dark overflow-scroll">
                        Tu będą notatki
                    </div>
                </div>
            </div>
        );
    }
}

export default NotesContainer;