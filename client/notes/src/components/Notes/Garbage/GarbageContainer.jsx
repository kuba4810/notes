import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../NotesList/List';

class GarbageContainer extends Component {
    state = {  }

    render() { 
        return ( 
            <div className="pt-4">
                <List noteType="deleted" />
            </div>
         );
    }
}
 
export default GarbageContainer;