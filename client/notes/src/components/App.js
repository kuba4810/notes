import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './Main';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/myStyles.css'
import '../styles/mainStyles.css'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
            <div>
                <Route exact path="/" component={Main}/>
            </div>
        </Router>

      </div>
    );
  }
}

export default App;
