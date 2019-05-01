import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import history from '../../services/history';
class SheduleContainer extends Component {
    state = {}

    componentWillMount(){
        if(!localStorage.getItem('id')){
            history.push('/');
        }      
    }
    render() {
        return (
            <div className="notesContainer h f-color-cornsilk bg-secondary">
                <Header />

                <div className="row height-100 bg-secondary">

                </div>
            </div>
        );
    }
}

export default SheduleContainer;