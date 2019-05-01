import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewNote from '../NewNote/NewNote';
import List from './List';

import { fetchAllNotes } from '../../../services/API/notes';
import { notesFetched } from '../../../actions/notes';

class NoteList extends Component {
    state = {
    }

    // componentDidMount = async () => {
    //     const user_id = localStorage.getItem('id');

    //     try {
    //         const res = await fetchAllNotes(user_id);
    //         console.log(res);

    //         if (res.response === 'success') {
    //             this.props.notesFetched(res.notes);
    //         }

    //     } catch (error) {
    //         console.log(error);

    //     }

    // }
    render() {
        return (
            <div>              
                <NewNote />
                <List noteType = "active" />
            </div>
        );
    }
}

const mapDispatchToProps = { notesFetched };
const mapStateToProps = state => {
    return {
        notes: state.notes
    };
}

const NotesListContainer = connect(mapStateToProps, mapDispatchToProps)(NoteList);

export default NotesListContainer;