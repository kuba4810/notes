import React, { Component } from 'react';
import { connect } from 'react-redux';
import { noteDeleted, noteChoosed, noteArchived, noteRestored } from '../../../actions/notes';
import { link } from 'fs';
import { deleteNote, archiveNote, restoreNote } from '../../../services/API/notes';
import { colorMoreDark } from '../../../services/colors/colors';


class NoteItem extends Component {
    state = {
        animate: 'fadeIn',
        visibility: 'visible'
    }

    // DELETE NOTE
    // ------------------------------------------------------------------------
    deleteNote = async (e) => {

        e.stopPropagation();
        let answer = window.confirm('Czy na pewno usunąć notatkę ?');
        if (answer) {
            console.log('Notatka do usunięcia: ', this.props.note._id);

            let note_id = this.props.note._id;

            let response = await deleteNote(note_id);

            try {
                if (response.data.response === 'success') {
                    this.props.noteDeleted(note_id);

                }
            } catch (error) {
                console.log(error);

            }
        }


    }

    // ARCHIVE NOTE
    // ------------------------------------------------------------------------
    archiveNote = async (e) => {

        e.stopPropagation();
        let answer = window.confirm('Czy na pewno archiwizować notatkę ?');
        if (answer) {

            let note_id = this.props.note._id;

            let response = await archiveNote(note_id);

            try {
                if (response.data.response === 'success') {
                    this.props.noteArchived(note_id);

                }
            } catch (error) {
                console.log(error);

            }
        }
    }

    // ARCHIVE NOTE
    // ------------------------------------------------------------------------
    restoreNote = async (e) => {

        e.stopPropagation();

        let note_id = this.props.note._id;

        let response = await restoreNote(note_id);

        try {
            if (response.data.response === 'success') {
                this.props.noteRestored(note_id);

            }
        } catch (error) {
            console.log(error);

        }

    }

    showDetails = () => {
        let container = document.querySelector('.noteDetails');
        container.classList.remove('d-none');
        container.classList.remove('fadeOut');

        container.classList.add('fadeIn');

        this.setState({
            visibility: 'hidden'
        })

        this.props.noteChoosed(this.props.note._id);

    }
    render() {

        let note = this.props.note;

        let style;
        if (note.color === '#fff' || note.color === '#ffffff') {
            style = {
                border: '1px solid #262626',
                backgroundColor: note.color
            }
        } else {
            style = {
                boxShadow: `1px solid ${note.color}`,
                backgroundColor: note.color
            }
        }

        let bgColor = colorMoreDark(note.color, 2);

        let labels = '';
        if (note.label.length > 0) {
            labels = note.label.split(',');
            labels = labels.map(l => (

                <div className=" single-label radius-15 p-2 mr-1 text-center"
                    style={{ backgroundColor: bgColor }}>
                    {l}
                </div>
            ))

        }
        // let tasks = note.tasks.map( t => (<li> {t} </li>) )
        return (
            <div className={"col-lg-4 col-md-6 mb-4 cursor-pointer animated " + this.state.animate}>
                {/* Note  */}
                <div className="noteItem position-relative radius-10 p-2"
                    style={style}
                    onClick={this.showDetails}>

                    {/* Title */}
                    <h5>{note.title}</h5>
                    {/* <hr /> */}

                    {/* Content */}
                    <p className="contentP overflow-hidden">
                        {
                            note.content.length > 0 ?
                            note.content.slice(0, 50) :
                            note.content
                        }
                    </p>


                    {
                        note.tasks.length > 0 ?
                        <p>Lista <i className="fas fa-check-square"></i></p> :
                        <p></p>
                    }



                    {labels}

                    {/* Restore */}

                    {
                        note.state !== 'active' &&
                        <div className="restoreItem d-flex justify-content-end noteItemProperties">
                            <div class="tip">
                                <i class="fas fa-caret-square-up"
                                    onClick={this.restoreNote}></i>
                                <span class="tooltiptext tipLeft">Przywróć</span>
                            </div>

                        </div>
                    }

                    {/* Archive */}

                    {
                        note.state !== 'archive' &&
                        <div className="archiveItem d-flex justify-content-end noteItemProperties">
                            <div class="tip">
                                <i class="fas fa-history mr-1"
                                    onClick={this.archiveNote}></i>
                                <span class="tooltiptext tipLeft">Archiwizuj</span>
                            </div>

                        </div>
                    }

                    {/* Delete */}

                    <div className="deleteItem d-flex justify-content-end noteItemProperties">
                        <div class="tip">
                            <i className="fas fa-trash"
                                onClick={this.deleteNote}></i>
                            <span class="tooltiptext tipLeft">Usuń</span>
                        </div>

                    </div>





                    <div className="row mt-1 position-absolute bottom-5">

                        {/* Labels */}
                        {/* <div className="col-12 mb-2">
                            
                        </div> */}

                        {/* Properties */}
                        <div className="col-12  noteItemProperties">
                            <div class="tip">
                                <i class="fas fa-palette ml-2 f-size-20"></i>
                                <span class="tooltiptext ">Zmień kolor</span>
                            </div>



                            <div class="tip">
                                <i class="fas fa-tag ml-3 f-size-18"></i>
                                <span class="tooltiptext">Edytuj etykiety</span>
                            </div>

                        </div>

                    </div>
                </div>



            </div>
        );
    }
}

const mapDispatchToProps = { noteDeleted, noteChoosed, noteArchived, noteRestored };
const mapStateToProps = state => {
    return ({
        notes: state.notes
    });
}

const Item = connect(mapStateToProps, mapDispatchToProps)(NoteItem)
export default Item;