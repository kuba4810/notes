const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');
const bodyParser = require('body-parser');



// Connection with MongoDB
// -----------------------------------------------------------
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
}, (err) => {
    if (!err) {
        console.log('Connection with database established...');
    } else {
        console.log(err);
    }
});

// Settings
// -----------------------------------------------------------
app.use(express.static('./client/notes/build'));
app.use(cors());
app.use(bodyParser.json());



// Routes
// -----------------------------------------------------------
require('./routes/user')(app);
require('./routes/notes')(app);
require('./routes/static')(app);

// Start application
// -----------------------------------------------------------
const PORT = process.env.PORT || 8080;
app.listen((process.env.PORT || 5000), () => {
    console.log(`Server listening on port ${PORT}`);
});