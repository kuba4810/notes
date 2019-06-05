import axios from 'axios';
const url = 'http://localhost:8080/api'


// Fetch all notes
export const fetchAllNotes = async (user_id) => {
    let notes = await fetch(url+'/notes/' + user_id);
    notes = await notes.json();

    return notes;
}

// Delete note
export const deleteNote = async (note_id) => {
    let response = await axios.delete(`${url}/note/${note_id}`);
    console.log(response);

    return response;
    
}

// Archive note
export const archiveNote = async (note_id) => {
    let response = await axios.post(`${url}/note/archive/${note_id}`);
    console.log(response);

    return response;
    
}

// Restore note
export const restoreNote = async (note_id) => {
    let response = await axios.post(`${url}/note/restore/${note_id}`);
    console.log(response);

    return response;
    
}

// Update note
export const updateNote = async (note) =>{
    let response = await axios.put(`${url}/note`,note);
    console.log(response);

    return response;
}

// Remove from garbage
// ----------------------------------------------------------------------------
export const removeFromGarbage = async (id) =>{
    let response = await axios.put(`${url}/note/remove`,{
        note_id : id
    });
    console.log(response);

    return response;
}

// Empty garbage
export const emptyGarbage = async (notes) =>{

    console.log('Notatki : ',notes)
    let response = await axios.post(`${url}/note/empty-garbage`,notes);

    console.log(response);

    return response;
}

