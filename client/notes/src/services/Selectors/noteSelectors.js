// FILTER NOTES BY ID
export const filterNotesById = (id, notes) => {
    let items = notes.filter(note => note._id === id);
    return items[0];
}

// FILTER BY LABEL
// ----------------------------------------------------------------------------
export const filterNotesByLabel = (notes, label) => {

    console.log('Lista notatek : ', notes);

    // If note contains given label it is added to array and returned
    let selectedNotes = notes.filter(note => {

        //  console.log('Obecna notatka : ', note);


        let labels = note.label.split(',');

        console.log('Labelki : ', labels);

        for (let i = 0; i < labels.length; i++) {
            const el = labels[i];

            if (el.includes(label)) {
                return note;
            }


        }


    })

    return selectedNotes

}