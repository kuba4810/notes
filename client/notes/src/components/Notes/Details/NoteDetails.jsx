import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { filterNotesById } from '../../../services/Selectors/noteSelectors';
import { noteUpdated } from '../../../actions/notes';
import { updateNote } from '../../../services/API/notes';
import { log } from 'util';
import { colorMoreDark } from '../../../services/colors/colors';
class NoteDetails extends React.Component {
    state = {
        title: '',
        content: '',
        labels: [],
        tasks: [],
        // Show inputs values
        showTitle: false,
        showContent: false
    }

    // Component did mount
    // ------------------------------------------
    componentDidMount() {

        if (typeof (this.props.note) !== 'undefined') {
            this.setState({
                isLoading: false,
                title: this.props.note.title,
                content: this.props.note.content
            })
        }
    }

    // Hide container
    // ------------------------------------------
    hideDetails = () => {
        let container = document.querySelector('.noteDetails');
        container.classList.remove('fadeIn');
        container.classList.add('fadeOut');

        this.setState({
            showContent: false,
            showTitle: false
        })

        setTimeout(() => {
            container.classList.add('d-none');
        }, 400)
    }

    handleInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showTitleInput = (title) => {
        this.setState({
            title: title,
            showTitle: true
        })
    }

    showContentInput = (content) => {
        this.setState({
            content: content,
            showContent: true
        })
    }

    submitTitle = () => {

        this.setState({
            showTitle: false
        })
        let n = this.props.note;
        console.log('id w details:', this.props.note._id);

        let note = {
            _id: n._id,
            content: n.content,
            title: this.state.title,
            label: n.label,
            creationDate: n.creationDate,
            type: n.type,
            color: n.color,
            tasks: n.tasks

        }
        this.props.noteUpdated(note);
        updateNote(note);

    }

    submitContent = () => {

        this.setState({
            showContent: false
        })
        let n = this.props.note;
        console.log('id w details:', this.props.note._id);

        let note = {
            _id: n._id,
            content: this.state.content,
            title: n.title,
            label: n.label,
            creationDate: n.creationDate,
            type: n.type,
            color: n.color,
            tasks: n.tasks

        }
        this.props.noteUpdated(note);
        updateNote(note);
    }


    render() {
        let note = '';
        let color = '#fff';
        let labels = '';


        if (typeof (this.props.note) !== 'undefined') {
            let data = this.props.note;

            color = data.color;
            console.log('Notatka : ', this.props.note);

            // #1 Note content
            // ----------------------------------------------------------------
            note = <div className="text-dark">
                <div className="row p-2">
                    <div className="col-11">

                        {/* Title */}
                        {!this.state.showTitle &&
                            <div className="w-20">
                                <h3 onClick={this.showTitleInput.bind(this, data.title)} className="cursor-pointer ">
                                    {data.title}
                                </h3>
                            </div>}

                        {this.state.showTitle &&
                            <div className="form-group">
                                <input name="title" type="text" className="form-control"
                                    value={this.state.title} onChange={this.handleInput} />
                            </div>}
                        {/* -------------------------------------------------------------------------------- */}
                    </div>

                    {this.state.showTitle &&
                        <div className="col-1 d-flex">
                            <i className="fas fa-check f-size-20 cursor-pointer"
                                onClick={this.submitTitle}></i>
                        </div>}

                </div>
                <hr className="width-90" />

                {/* Content */}
                <div className="row p-2">
                    <div className="col-11 cursor-pointer">

                        {!this.state.showContent &&
                            <p className="detailsContent" onClick={this.showContentInput.bind(this, data.content)} >
                                {data.content}
                            </p>
                        }

                        {this.state.showContent &&
                            <textarea name="content" id="" rows="6" onChange={this.handleInput}
                                value={this.state.content} wrap="hard">
                            </textarea>}

                    </div>

                    {this.state.showContent &&
                        <div className="col-1 d-flex">
                            <i className="fas fa-check f-size-20 cursor-pointer"
                                onClick={this.submitContent}></i>
                        </div>}
                </div>

            </div>
            // ----------------------------------------------------------------

            // Labels
            // ----------------------------------------------------------------
            if (data.label.length > 0) {
                let bgColor = colorMoreDark(data.color,2);
                labels = data.label.split(',');
                labels = labels.map(l => (
                    <div className=" single-label text-dark radius-15 p-2 mr-1 text-center"
                    style={{backgroundColor : bgColor}}> 
                   {l} 
               </div>
                ))
                console.log('Etykiety : ',labels);
                
    
            }
            // ----------------------------------------------------------------
        }


        return (
            <div className="noteDetails animated fadeOut d-none">
                <div className="row h-100 d-flex align-items-center">
                    {/* Col 9 */}
                    <div className="col-lg-6 col-md-8 col-sm-10 h-50 mr-auto ml-auto noteDetailsContent animated zoomIn "
                        style={{ 'background-color': color }}>

                        {/* Header */}
                        <div className="d-flex justify-content-end p-2">
                            <i className="fas fa-times f-size-20 cursor-pointer text-dark"
                                onClick={this.hideDetails}></i>
                        </div>

                        {/* #1 Note content */}
                        {note}

                        {labels}

                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = { noteUpdated }
const mapStateToProps = state => {
    return ({
        note: filterNotesById(state.notes.currentNote, state.notes.notes)
    });
}

const Details = connect(mapStateToProps, mapDispatchToProps)(NoteDetails)

export default Details;