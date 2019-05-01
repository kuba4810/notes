const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
    userId : String,
    title : String,
    content : String,
    creationDate : String,
    color : String,
    label: String,
    tasks : Array,
    state : {type :String, default : 'active'}
});

const NoteModel = mongoose.model('notes',noteSchema);

module.exports = NoteModel;