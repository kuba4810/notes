const noteModel = require('../models/Note');

// Create new note
// ----------------------------------------------
async function createNew(note){
    return Promise.resolve().then(()=>{
        return noteModel(note).save();
    })
}


// Find all notes by user id
// ---------------------------------------------
async function findAllByUserId(userId){
    return Promise.resolve().then(()=>{
        return noteModel.find({
            userId : userId
        });
    })
}

// Find note by id
// ---------------------------------------------
async function findNoteById(noteId){
    return Promise.resolve().then(()=>{
        return noteModel.find({
            _id : noteId
        });
    })
}

// Delete note
// ----------------------------------------------
async function deleteNote(noteId){
    return Promise.resolve().then(()=>{
        return noteModel.deleteOne({
            _id : noteId
        });
    })
}

module.exports = {
    createNew: createNew,
    findAllByUserId: findAllByUserId,
    findNoteById : findNoteById,
    deleteNote : deleteNote
};