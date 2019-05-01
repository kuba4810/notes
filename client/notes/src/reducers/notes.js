import {
    log
} from "util";

export const notes = (state = {
    isLoading: true,
    notes: [],
    currentNote: '',
    label: ''
}, action) => {

    let notes;
    let note;

    switch (action.type) {

        // Notes fetched
        // --------------------------------------------------------------------
        case 'NOTES_FETCHED':
            return Object.assign({}, state, {
                notes: [...action.notes],
                isLoading: false
            })

        // Note choosed
        // --------------------------------------------------------------------
        case 'NOTE_CHOOSED':
            return Object.assign({}, state, {
                currentNote: action.id
            })

        // Note updated
        // --------------------------------------------------------------------
        case 'NOTE_UPDATED':

            notes = state.notes.map(n => {
                if (n._id === action.note._id) {

                    let newNote = Object.assign({}, n, {
                        title: action.note.title,
                        content: action.note.content
                    })

                    return newNote

                } else {
                    return n;
                }

            });

            console.log(notes);


            return Object.assign({}, state, {
                notes: [...notes]
            });

        // Note added
        // --------------------------------------------------------------------
        case 'NOTE_ADDED':
            notes = state.notes;
            notes.push(action.note);

            return Object.assign({}, state, {
                notes: [...notes]
            });

         // Note deleted
         // --------------------------------------------------------------------
        case 'NOTE_DELETED':

            notes = state.notes.map(note => {
                if (note._id === action.id) {
                    return Object.assign({}, note, {
                        state: 'deleted'
                    })
                } else {
                    return note;
                }
            })

            return Object.assign({}, state, {
                notes: [...notes]
            });

        // Note archived
        // --------------------------------------------------------------------
        case 'NOTE_ARCHIVED':

            notes = state.notes.map(note => {
                if (note._id === action.id) {
                    return Object.assign({}, note, {
                        state: 'archive'
                    })
                } else {
                    return note;
                }
            })

            return Object.assign({}, state, {
                notes: [...notes]
            });
        // Note archived
        // --------------------------------------------------------------------
        case 'NOTE_RESTORED':

            notes = state.notes.map(note => {
                if (note._id === action.id) {
                    return Object.assign({}, note, {
                        state: 'active'
                    })
                } else {
                    return note;
                }
            })

            return Object.assign({}, state, {
                notes: [...notes]
            });

        default:
            return state;
    }

}