import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import MainHeader from './MainHeader';
class Main extends Component {
    state = { 
        login : '',
        password : ''
     }
    render() { 
        return ( <div>

            {/* Container */}
            <div className="container-fluid bg-dark height-100  overflow-hidden ">
              {/* Header */}
              <MainHeader />
              {/* Main */}
              <div className="row mainPageContainer f-color-cornsilk">
    
                  <div className="mainPageContent">
                      {/* <h1 className="letter-spacing-5  text-center w-100">
                         <i class="fas fa-sticky-note"></i> Notes
                      </h1> */}
                  {/* LogIn form */}
                  <div className="col-4 mr-auto ml-auto f-color-dark">
                     <form className="bg-light  p-5">
                        <h2 >Zaloguj się !</h2>
                        <hr className="bg-dark"/>
                        <div className="form-group ">
                           <label htmlFor="login">Login lub adres e-mail</label>
                           <input type="text" name="login" className="form-control"/>
                        </div>
    
                        <div className="form-group">
                           <label htmlFor="password">Hasło</label>
                           <input type="password" name="password" className="form-control"/>
                        </div>
    
                        <div className="form-group">
                           <div className="btn  btn-warning form-control">Zaloguj</div>
                        </div>                
    
                     </form>
                  </div>
                  </div>
    
              </div>
              {/* Footer */}
              <div className="row footer flex-center f-color-cornsilk text-center">  
                Copyright &copy; 2019 Jakub Kozioł
              </div>
            </div>
    
          </div> );
    }
}
 
export default Main;