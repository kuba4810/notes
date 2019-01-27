import React, { Component } from 'react';
class Main extends Component {
    state = { 
        login : '',
        password : ''
     }
    render() { 
        return ( <div>

            {/* Container */}
            <div className="container-fluid bg-dark height-100 overflow-hidden">
              {/* Header */}
              <div className="row bg-warning f-color-cornsilk height-15">
                 <div className="col-10 m-auto text-center">
                     <h1 className="letter-spacing-5">  Notatki na każdy dzień </h1>
                      <h3> Zaplanuj swoje zadania</h3>
                      <hr/>
                 </div>
              </div>
              {/* Main */}
              <div className="row bg-dark f-color-cornsilk height-80">
    
                  {/* LogIn form */}
                  <div className="col-4 mr-auto ml-auto mt-5">
                     <form>
                        <h2 >Zaloguj się !</h2>
                        <hr className="bg-light"/>
                        <div className="form-group">
                           <label htmlFor="login">Login lub mail</label>
                           <input type="text" name="login" className="form-control"/>
                        </div>
    
                        <div className="form-group">
                           <label htmlFor="password">Hasło</label>
                           <input type="password" name="password" className="form-control"/>
                        </div>
    
                        <div className="form-group">
                           <div className="btn btn-success form-control">Zaloguj</div>
                        </div>                
    
                     </form>
                  </div>
    
              </div>
              {/* Footer */}
              <div className="row flex-center bg-secondary f-color-cornsilk height-5 text-center">  
                Copyright &copy; 2019 Jakub Kozioł
              </div>
            </div>
    
          </div> );
    }
}
 
export default Main;