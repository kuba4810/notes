import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../NotesList/List';

class GarbageContainer extends Component {
    state = {  }

    render() { 
        return ( 
            <div className="pt-4">

                <h5 className="text-center">
                    <em>Notatki są usuwane z kosza po siedmiu dniach.</em>

                    {/* <div className="emptyGarbage text-primary">
                        Opróżnij kosz
                    </div> */}

                </h5>

                <List noteType="deleted" />
            </div>
         );
    }
}
 
export default GarbageContainer;