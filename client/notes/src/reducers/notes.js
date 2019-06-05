import {
    log
} from "util";

export const notes = (state = {
    isLoading: true,
    notes: [],
    currentNote: '',
    label: '',
    detailsVisible: false
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
            // Task updated
            // --------------------------------------------------------------------
        case 'TASK_UPDATED':

            notes = state.notes.map(note => {
                if (action.data.note_id === note._id) {

                    let tasks = note.tasks.map(task => {
                        if (task.id === action.data.task_id) {
                            task.done = !task.done;
                            return task;
                        } else {
                            return task;
                        }
                    })

                    note.tasks = [...tasks];

                    // console.log('TASK_UPDATED', note.tasks)

                    return note;

                } else {
                    return note;
                }
            })

            return Object.assign({}, state, {
                notes: [...notes]
            })

            // Details visibility
            // -------------------------------------------------------------------
        case 'DETAILS_VISIBILITY':
            return Object.assign({}, state, {
                detailsVisible: !state.detailsVisible
            })

        case 'EMPTY_GARBAGE':

            notes = state.notes.filter(note => (
                note.state !== 'deleted'
            ));

            return Object.assign({}, state, {
                notes: [...notes]
            })

        case 'REMOVE_FROM_GARBAGE':

            notes = state.notes.filter(note => (
                note._id !== action.id
            ))

            return Object.assign({}, state, {
                notes: [...notes]
            })


        default:
            return state;
    }

}