import React, { Component } from 'react';
import List from '../NotesList/List';

class ArchiveContainer extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="pt-4">
                <List noteType="archive" />
            </div>
         );
    }
}
 
export default ArchiveContainer;