import React, { Component } from 'react';
import { connect } from 'react-redux';



import NoteItem from './NoteItem';

import {filterNotesByLabel} from '../../../services/Selectors/noteSelectors';

class NoteList extends Component {
    state = {}
    render() {

        console.log('NoteList render ...');
        let notes = '';
        if (this.props.notes.isLoading === false &&
            this.props.notesList.length > 0) {

            notes = this.props.notesList.filter( note => note.state === this.props.noteType );

            notes = notes.map( n=> ( <NoteItem note={n} /> ) )
        }

        return (
            <div className="row">
                {notes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        notesList :  /* state.notes.notes */ filterNotesByLabel(state.notes.notes,state.user.currentLabel)
    };
}

const List = connect(mapStateToProps)(NoteList);

export default List;