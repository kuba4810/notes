import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';

import MainHeader from './MainHeader';
import LoginContainer from './Login/LoginContainer';
import RegisterComponent from './Register/RegisterComponent';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/myStyles.css'
import '../styles/mainStyles.css'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <div className="overflow-hidden h-100">
                {/* Header */}
                <MainHeader />
                
                {/* Main */}
                <div  className="container-fluid bg-dark">

                    <div className="row mainPageContainer f-color-cornsilk">
                        <div className="mainPageContent">

                            {/* Routing */}
                            <Route  exact path="/" component={Main} />
                            <Route   path="/logowanie" component={LoginContainer} />    
                            <Route   path="/rejestracja" component={RegisterComponent} />  
                            {/* ------------------------------------------------- */}

                          </div>
                        </div>                      
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
