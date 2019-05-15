const noteModel = require('../models/Note');

// Create new note
// ----------------------------------------------
async function createNew(note){

    // let array = note.tasks.split(',');
    // note.tasks = array;

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
        return noteModel.findByIdAndUpdate({_id : noteId},{state : 'deleted'})
    })
}

// Archive note
// ----------------------------------------------
async function archiveNote(noteId){
    return Promise.resolve().then(()=>{
        return noteModel.findByIdAndUpdate({_id : noteId},{state : 'archive'})
    })
}

// Restore note
// ----------------------------------------------
async function restoreNote(noteId){
    return Promise.resolve().then(()=>{
        return noteModel.findByIdAndUpdate({_id : noteId},{state : 'active'})
    })
}

// Update note
// ----------------------------------------------
async function updateNote(note){
    console.log(note);
    
    return Promise.resolve().then(()=>{
        return noteModel.findByIdAndUpdate({_id : note._id},note)
    });
}

module.exports = {
    createNew: createNew,
    findAllByUserId: findAllByUserId,
    findNoteById : findNoteById,
    deleteNote : deleteNote,
    updateNote : updateNote,
    archiveNote : archiveNote,
    restoreNote : restoreNote
};