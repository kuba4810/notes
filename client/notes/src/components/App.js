import React, { Component } from 'react';
import { Router as Router, Route } from 'react-router-dom';
import history from '../services/history';

import MainHeader from './MainHeader';
import LoginContainer from './Login/LoginContainer';
import RegisterComponent from './Register/RegisterComponent';
import Main from './Main.jsx';
import NotesContainer from './Notes/NotesContainer';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/myStyles.css'
import '../styles/mainStyles.css'
import '../styles/animations.css'
class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
            <div className="overflow-hidden h-100">
                {/* Header */}
                <MainHeader />
                
                {/* Main */}
                <div  className="container-fluid bg-dark">

                            {/* Routing */}
                            <Route   exact path="/" component={Main} />
                            <Route   path="/logowanie" component={LoginContainer} />    
                            <Route   path="/rejestracja" component={RegisterComponent} />
                            <Route   path ="/notatki" component ={NotesContainer} />
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
