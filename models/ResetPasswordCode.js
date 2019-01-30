const mongoose = require('mongoose');
const { Schema } = mongoose;

const codeSchema = new Schema({
    mail : String,
    code : String
});

const CodeModel = mongoose.model('codes',codeSchema);

module.exports = CodeModel;