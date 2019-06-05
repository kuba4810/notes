import React, { Component } from 'react';
import { connect } from 'react-redux';

import { emptyGarbage } from '../../../services/API/notes.js';
import { garbageEmpty } from '../../../actions/notes';


import NoteItem from './NoteItem';

import { filterNotesByLabel } from '../../../services/Selectors/noteSelectors';

class NoteList extends Component {
    constructor() {
        super();
        this.state = {
            firstColumn: [],
            secondColumn: [],
            thirdColumn: [],
            isCreating: false
        }
    }


    emptyGarbage = async () => {

        const notes = [];

        for (const note of this.props.notesList) {
            if (note.state === 'deleted') {
                notes.push(note._id);
            } 
        }

        // console.log('Znalezione ID : ',notes);

        let res = await emptyGarbage(notes);

        if (res.data.response === 'success') {
            this.props.garbageEmpty();
        }


    }
    createNotes = async () => {


        // console.log('Tworzę notatki !')

        await this.setState({
            firstColumn: [],
            secondColumn: [],
            thirdColumn: []
        })
        let notes = this.props.notesList.filter(note => note.state === this.props.noteType);

        // Get all column nodes
        const firstColumn = document.querySelector('.firstNotesColumn');
        const secondColumn = document.querySelector('.secondNotesColumn');
        const thirdColumn = document.querySelector('.thirdNotesColumn');

        // Check height of first column



        // Loop throuh note list
        let counter = 1;
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];

            // console.log('Notatka n-ta',element);
            // console.log('Counter : ', counter);
            // console.log('Licznik i : ',i);

            // Check columns height
            const fH = firstColumn.offsetHeight;
            const sH = secondColumn.offsetHeight;
            const tH = thirdColumn.offsetHeight;

            // console.log('Wysokości kolumn : ',fH,sH,tH)

            // // Find minimum
            // let whichColumn = 1;
            // let min = fH;
            // if (sH < min) {
            //     whichColumn = 2
            // }

            // if (tH < min) {
            //     whichColumn = 3
            // }

            let array;

            switch (counter) {
                case 1:

                    array = this.state.firstColumn;
                    array.push(<NoteItem key={element._id} note={element} />)



                    this.setState({
                        firstColumn: [...array]
                    }, () => {
                        // console.log(this.state);
                    })

                    break;
                case 2:

                    array = this.state.secondColumn;
                    array.push(<NoteItem key={element._id} note={element} />)


                    this.setState({
                        secondColumn: [...array]
                    }, () => {
                        // console.log(this.state);
                    })

                    break;
                case 3:

                    array = this.state.thirdColumn;
                    array.push(<NoteItem key={element._id} note={element} />)


                    this.setState({
                        thirdColumn: [...array]
                    }, () => {
                        // console.log(this.state);
                    })

                    break;
                default:
                    break;
            }
            if (counter === 3) {
                counter = 1;
            } else {
                counter = counter + 1;
            }

        }

        // console.log(this.state);
    }

    componentDidUpdate(prev) {

        if (
            (this.props.notesList.length > 0 && (prev.notesList.length !== this.props.notesList.length)) ||
            (this.props.notesList.filter(note => note.state === this.props.noteType).length <
                prev.notesList.filter(note => note.state === this.props.noteType).length) ||
            prev !== this.props) {
            this.createNotes();
        }


    }

    componentDidMount() {

        this.createNotes();

    }
    render() {

        return (
            <div>
                {
                    this.props.noteType === 'deleted' ?
                        <div className="emptyGarbage text-primary w-25 mx-auto text-center cursor-pointer"
                        onClick={this.emptyGarbage}>
                            Opróżnij kosz
                    </div> :
                        ""
                }

                <div className="row pr-3">


                    {/* {notes} */}

                    <div className="col-lg-4 col-md-6 firstNotesColumn">

                        <div className="row">
                            {this.state.firstColumn}
                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6 secondNotesColumn">

                        <div className="row">
                            {this.state.secondColumn}
                        </div>

                    </div>

                    <div className="col-lg-4 col-md-6 thirdNotesColumn">

                        <div className="row">
                            {this.state.thirdColumn}
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

const mapDispatchToProps = { garbageEmpty }
const mapStateToProps = state => {
    return {

        notesList: filterNotesByLabel(state.notes.notes, state.user.currentLabel)
    };
}

const List = connect(mapStateToProps, mapDispatchToProps)(NoteList);

export default List;