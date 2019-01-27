const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    userId : String,
    title : String,
    content : String,
    creationDate : String
});

const NoteModel = mongoose.model('notes',noteSchema);

module.exports = NoteModel;