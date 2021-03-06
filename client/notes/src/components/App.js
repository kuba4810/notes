import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../services/history';

import MainHeader from './MainHeader';
import LoginContainer from './Login/LoginContainer';
import RegisterComponent from './Register/RegisterComponent';
import Main from './Main.jsx';
import NotesContainer from './Notes/NotesContainer';
import SheduleContainer from './Shedule/SheduleContainer';
import ProfileContainer from './Profile/ProfileContainer';
import PasswordReset from './PasswordReset/PasswordReset';
import ChangePassword from './ChangePassword/ChangePassword';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/myStyles.css'
import '../styles/mainStyles.css'
import '../styles/animations.css'
import '../styles/shedule.css'
class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
            <div className="overflow-hidden h-100">
                {/* Header */}
                <MainHeader />
                
                {/* Main */}
                <div  className="container-fluid p-0">

                            {/* Routing */}
                            <Route   exact path="/" component={Main} />
                            <Route   path="/logowanie" component={LoginContainer} />    
                            <Route   path="/rejestracja" component={RegisterComponent} />
                            <Route   path ="/notatki" component ={NotesContainer} />
                            <Route   path ="/harmonogram" component ={SheduleContainer} />
                            <Route   path ="/profil" component ={ProfileContainer} />
                            <Route   path="/reset" component={PasswordReset}/>
                            <Route   path="/nowe-haslo/:code" component={ChangePassword}/>
                            {/* ------------------------------------------------- */}

                          </div>

                {/* Footer */}
                <Footer />
            </div>
        </Router>

      </div>
    );
  }
}

export default App;
