const express = require('express');
const app = express();

// Settings
app.use(express.static('client/notes/build'));

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);    
});