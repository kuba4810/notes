
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

