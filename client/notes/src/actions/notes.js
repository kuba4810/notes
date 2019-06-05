
// Notes fetched
// -------------------------------------
export const notesFetched = (notes) =>({
    type : 'NOTES_FETCHED',
    notes
});

// Note choosed
export const noteChoosed = (id) => ({
    type : 'NOTE_CHOOSED',
    id
});

// Note updated
export const noteUpdated = (note) => ({
    type : 'NOTE_UPDATED',
    note
});

// Note added
// ------------------------------------
export const noteAdded = (note) =>({
    type : 'NOTE_ADDED',
    note
});

// Note deleted
// ------------------------------------
export const noteDeleted = (id) => ({
    type : 'NOTE_DELETED',
    id
});

// Note archived
// ------------------------------------
export const noteArchived= (id) => ({
    type : 'NOTE_ARCHIVED',
    id
});

// Note restored
// ------------------------------------
export const noteRestored= (id) => ({
    type : 'NOTE_RESTORED',
    id
});

// Task updated
export const taskUpdated = (data) => ({
    type : 'TASK_UPDATED',
    data
})

// Details visibility changed
export const detailsVisibility = () => ({
    type : 'DETAILS_VISIBILITY'

})

// Empty garbage
export const garbageEmpty = () => ({
    type : 'EMPTY_GARBAGE'
})

// Remove from garbage
export const removeNote = (id) => ({
    type : 'REMOVE_FROM_GARBAGE',
    id
})


