const noteDAO = require('../dao/noteDAO');

module.exports = (app) => {


    // Create new note
    // ------------------------------------------

    app.post('/api/notes', async (request, response) => {
        try {
            let note = await noteDAO.createNew(request.body);
            if (note) {
                response.send({
                    response: 'success',
                    note: note
                })
            }
        } catch (err) {
            console.log(err);
            response.send({
                response: 'failed'
            })
        }
    });



    // Get all notes for user specified by id
    // ------------------------------------------
    app.get('/api/notes/:userId', async (request, response) => {

        try {
            let notes = await noteDAO.findAllByUserId(request.params.userId);

            if (notes) {
                response.send({
                    response: 'success',
                    notes: notes
                })
            }
        } catch (err) {
            console.log(err);
            response.send({
                response: 'failed'
            })
        }

    });


    // Get note by noteId
    // ------------------------------------------
    app.get('/api/note/:noteId', async (request, response) =>{
        try {
            let note = await noteDAO.findNoteById(request.params.noteId);

            if (note) {
                response.send({
                    response: 'success',
                    note: note
                })
            }
        } catch (err) {
            console.log(err);
            response.send({
                response: 'failed'
            })
        }
    });

    // Delete note
    // ------------------------------------------
    app.delete('/api/note',async (request,response)=>{
        try{
            let note = await noteDAO.deleteNote(request.body.noteId);

            if (note) {
                response.send({
                    response: 'success',
                    note: note
                })
            }
        }catch(err){
            console.log(err);
            response.send({
                response: 'failed'
            })
        }
    });

}