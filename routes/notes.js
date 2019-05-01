const noteDAO = require('../dao/noteDAO');

module.exports = (app) => {


    // Create new note
    // ------------------------------------------

    app.post('/api/note', async (request, response) => {
        console.log(request.body);

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
        console.log('Get all notes...')

        try {
            let notes = await noteDAO.findAllByUserId(request.params.userId);

            response.send({
                response: 'success',
                notes: notes
            })

        } catch (err) {
            console.log(err);
            response.send({
                response: 'failed'
            })
        }

    });


    // Get note by noteId
    // ------------------------------------------
    app.get('/api/note/:noteId', async (request, response) => {
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
    app.delete('/api/note/:note_id', async (request, response) => {
        try {
            let note = await noteDAO.deleteNote(request.params.note_id);

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

    // Archive note
    // ------------------------------------------
    app.post('/api/note/archive/:note_id', async (request, response) => {
        try {
            let note = await noteDAO.archiveNote(request.params.note_id);

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

    // Restore note
    // ------------------------------------------
    app.post('/api/note/restore/:note_id', async (request, response) => {
        try {
            let note = await noteDAO.restoreNote(request.params.note_id);

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

    // Update note
    // ------------------------------------------
    app.put('/api/note', async (request, response) => {

        try {
            let note = await noteDAO.updateNote(request.body);

            if (note) {
                response.send({
                    response: 'success',
                    note: note
                })
            }
        } catch (error) {
            console.log(error);
            response.send({
                response: 'failed'
            })
        }
    });

}