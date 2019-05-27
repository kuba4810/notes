import React, { Component } from 'react';
import { connect } from 'react-redux';



import NoteItem from './NoteItem';

import { filterNotesByLabel } from '../../../services/Selectors/noteSelectors';

class NoteList extends Component {
    state = {
        firstColumn : [],
        secondColumn : [],
        thirdColumn : []
    }


    createNotes = (notes) => {
        const firstColumn = document.querySelector('.firstNotesColumn');
        const secondColumn = document.querySelector('.secondNotesColumn');
        const thirdColumn = document.querySelector('.thirdNotesColumn');

        console.log(firstColumn.innerHeight);
    }
    
    componentDidMount(){

    }
    render() {
        this.createNotes();

        console.log('NoteList render ...');
        let notes = '';
        if (this.props.notes.isLoading === false &&
            this.props.notesList.length > 0) {

            notes = this.props.notesList.filter(note => note.state === this.props.noteType);

            notes = notes.map(n => (<NoteItem note={n} />))
        }



        return (
            <div className="row">
                {/* {notes} */}

                <div className="col-4 firstNotesColumn">

                    <div className="row">
                        <div className="noteItem bg-primary mx-2 my-1">

                            dsgsdfgdsfg
                        </div>

                        <div className="noteItem  bg-primary mx-2 my-1">
                            <pre>
                                dsfdfsdd
                                safsgsrf
                                dsfsdfgsfgdfgsdfg
                            </pre>
                        </div>

                        <div className="noteItem  bg-primary mx-2 my-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>
                            dolores aliquam accusantium quasi veniam similique consequatur aliqu <br/>
                            id, iste nesciunt? Ad nobis aliquam numquam! <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>
                            dolores aliquam accusantium quasi veniam similique consequatur aliqu <br/>
                            id, iste nesciunt? Ad nobis aliquam numquam!
                            </div>
                            <div className="noteItem  bg-primary mx-2 my-1">
                            <pre>
                                dsfdfsdd
                                safsgsrf
                                dsfsdfgsfgdfgsdfg
                            </pre>
                        </div>
                        <div className="noteItem  bg-primary mx-2 my-1">
                            <pre>
                                dsfdfsdd
                                safsgsrf
                                dsfsdfgsfgdfgsdfg
                            </pre>
                        </div>
                    </div>
                    
                </div>

                <div className="col-4 secondNotesColumn">

                    <div className="row">
                        <div className="noteItem  bg-primary mx-2 my-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>
                            dolores aliquam accusantium quasi veniam similique consequatur aliqu <br/>
                            id, iste nesciunt? Ad nobis aliquam numquam!
                            </div>
                        <div className="noteItem  bg-primary mx-2 my-1">fdgdsfgfdsgdf</div>
                        <div className="noteItem  bg-primary mx-2 my-1">
                            <pre>
                                dsfdfsdd
                                safsgsrf
                                dsfsdfgsfgdfgsdfg
                            </pre>
                        </div>
                        <div className="noteItem  bg-primary mx-2 my-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>
                            dolores aliquam accusantium quasi veniam similique consequatur aliqu <br/>
                            id, iste nesciunt? Ad nobis aliquam numquam! <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>
                            dolores aliquam accusantium quasi veniam similique consequatur aliqu <br/>
                            id, iste nesciunt? Ad nobis aliquam numquam!
                            </div>
                    </div>

                </div>

                <div className="col-4 thirdNotesColumn">

                    <div className="row">
                        <div className="noteItem  bg-primary mx-2 my-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates <br />
                            adipisci dolor minus, incidunt atque in impedit magnam  <br />
                            culpa ullam. Debitis esse quae aperiam vitae placeat, minima asperiores porro nesciunt rerum.
                        </div>

                        <div className="noteItem  bg-primary mx-2 my-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>

                            </div>
                            <div className="noteItem  bg-primary mx-2 my-1">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>
                            dolores aliquam accusantium quasi veniam similique consequatur aliqu <br/>
                            id, iste nesciunt? Ad nobis aliquam numquam! <br/>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam <br/>
                            laudantium odio distinctio possimus inventore, suscipit repellat <br/>
                            dolores aliquam accusantium quasi veniam similique consequatur aliqu <br/>
                            id, iste nesciunt? Ad nobis aliquam numquam!
                            </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        notesList:  /* state.notes.notes */ filterNotesByLabel(state.notes.notes, state.user.currentLabel)
    };
}

const List = connect(mapStateToProps)(NoteList);

export default List;