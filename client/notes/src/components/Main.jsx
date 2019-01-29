import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Router , Route } from 'react-router-dom';
import history from '../services/history';




class Main extends Component {
    state = {
        login: '',
        password: ''
    }
    componentWillMount(){
        if(localStorage.getItem('id')){
            history.push('/notatki');
        }
    }
    render() {
        return (


            <div className="row mainPageContainer f-color-cornsilk">
                <div className="mainPageContent">
                    <div className="welcomePage animated fadeIn a-d-5">
                        <div className="row mt-5">
                            <h1 className="hlogo text-center w-100"><i class="fas fa-calendar-check"></i></h1>
                        </div>
                        <div className="row pt-3 a-n-5">
                            <h1 className="mt-5 m-auto">
                                Organizuj dzień, gdziekolwiek jesteś !
                    </h1>
                        </div>

                        <div className="row">
                            <div className="col-4 mt-5 mr-auto ml-auto flex-j-center">
                                <Link to={"/logowanie"}>
                                    Rozpocznij
                        </Link>
                            </div>
                        </div>

                        {/* <div className="row">
                    <div className="col-12 betweenSection mt-5 mr-auto ml-auto">
                        <h3 className="f-color-dark text-center">
                            Lubisz tworzyć notatki, lubisz planować zadania? Więc ta aplikacja jest dla Ciebie !
                        </h3>
                        <div className="welcomeSection">
                        
                        </div>
                    </div>
                </div> */}



                    </div>
                </div>
            </div>

        );
    }
}

export default Main;