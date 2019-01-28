import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';



class Main extends Component {
    state = { 
        login : '',
        password : ''
     }
    render() { 
        return (
             <div>

           <h1 className="text-center mt-5"> 
               Twórz notatki, planuj zadania i organizuj swój dzień !
           </h1>
           
           <div className="row">
                <div className="col-4 m-auto">
                    <Link to={"/logowanie"}> Rozpocznij </Link>
                </div>
           </div>
    
          </div> 
          );
    }
}
 
export default Main;