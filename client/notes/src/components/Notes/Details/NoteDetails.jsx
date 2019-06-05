import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { filterNotesById } from '../../../services/Selectors/noteSelectors';
import { noteUpdated, taskUpdated } from '../../../actions/notes';
import { updateNote } from '../../../services/API/notes';
import { log } from 'util';
import { colorMoreDark } from '../../../services/colors/colors';
class NoteDetails extends React.Component {
    state = {
        title: '',
        content: '',
        labels: [],
        tasks: [],
        showTitle: false,
        showContent: false
    }

    componentDidUpdate(prev) {
        if (((prev.detailsVisible !== this.props.detailsVisible) && this.props.detailsVisible === true) ||
            prev.note !== this.props.note) {
            this.setState({
                tasks: [...this.props.note.tasks]
            })
            this.render();
        }
    }

    // Update task
    updateTask = async (task_id,id,e) => {

        // console.log('Stan checkboxa: ', e.target.checked);
        document.querySelector(`#${id}`).classList.toggle('checkmarkChecked');

        const data = {
            task_id: task_id,
            note_id: this.props.note_id
        }

        await this.props.taskUpdated(data)

        let note = this.props.note;

        try {

            let res = await updateNote(this.props.note);
            this.render();

        } catch (error) {
            // console.log('Task update error : ', error)
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
        }, () => {
            document.querySelector('.detailsTitle').focus();
        })
    }

    showContentInput = (content) => {
        this.setState({
            content: content,
            showContent: true
        }, () => {
            document.querySelector('.noteDetailContent').focus();
        })


    }

    submitTitle = () => {

        this.setState({
            showTitle: false
        })
        let n = this.props.note;

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
        // console.log('id w details:', this.props.note._id);

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
        let tasks = [];

        // console.log('Tasks na początku render !',tasks);



        if (typeof (this.props.note) !== 'undefined') {
            let data = this.props.note;

            // console.log('Notatka w Details: ',this.props.note);

            color = data.color;

            // #1 Note content
            // ----------------------------------------------------------------
            note = <div className="text-dark">
                <div className="row p-2">
                    <div className="col-11">

                        {/* Title */}
                        {!this.state.showTitle &&
                            <div className="w-20">
                                <h3 onClick={this.showTitleInput.bind(this, data.title)} className="cursor-pointer ">
                                    {data.title.length > 0 ? data.title : "Tytuł..."}
                                </h3>
                            </div>}

                        {this.state.showTitle &&
                            <div className="form-group">
                                <input name="title" type="text" className="form-control detailsTitle"
                                    value={this.state.title} onChange={this.handleInput} placeholder="Tytuł..."
                                    onBlur={this.submitTitle} />
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
                                {data.content.length > 0 ? data.content : "Treść..."}
                            </p>
                        }

                        {this.state.showContent &&
                            <textarea className="noteDetailContent" name="content" id="" rows="6" onChange={this.handleInput}
                            onBlur={this.submitContent}
                                value={this.state.content} wrap="hard" placeholder="Treść...">
                            </textarea>
                        }

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
                let bgColor = colorMoreDark(data.color, 2);
                labels = data.label.split(',');
                labels = labels.map((l, index) => (
                    <div key={index} className=" single-label text-dark radius-15 p-2 mr-1 text-center"
                        style={{ backgroundColor: bgColor }}>
                        {l}
                    </div>
                ))


            }
            // ----------------------------------------------------------------

            // Tasks
            // ----------------------------------------------------------------

            if (data.tasks.length > 0) {


                let values = this.props.note.tasks.map((t, index) => {
                    return this.props.note.tasks[index].done
                })

                // console.log('Wartości done : ', values);
                tasks = this.props.note.tasks.map((task, index) => {

                    console.log(`Task o indexie ${index}: `,task.done);

                    return (
                    <label className="tasks noteDetailsTasks d-flex align-items-center">

                        {/* <input className="mr-2 " type="checkbox" name="" id="" checked={task.done}
                                onChange={this.updateTask.bind(this, task.id)} /> */}

                        <span id={`task${index}`} className={`checkmark ${task.done ? 'checkmarkChecked': ''}`}
                        onClick={this.updateTask.bind(this, task.id,`task${index}`)}></span>
                        <input type="text" className="form-control ml-3" value={task.name} />

                     </label>  )               


                })

            }

            // ----------------------------------------------------------------
        }


        return (
            <div className="noteDetails animated fadeOut d-none">
                <div className="row h-100 d-flex align-items-center">
                    {/* Col 9 */}
                    <div className="col-lg-6 col-md-8 col-sm-10 mr-auto ml-auto noteDetailsContent animated zoomIn "
                        style={{ 'backgroundColor': color }}>

                        {/* Header */}
                        <div className="d-flex justify-content-end p-2">
                            <i className="fas fa-times f-size-20 cursor-pointer text-dark"
                                onClick={this.hideDetails}></i>
                        </div>

                        {/* #1 Note content */}
                        {note}

                        {/* Tasks */}
                        {tasks}

                        <div className="mt-2 mb-5">
                            {labels}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = { noteUpdated, taskUpdated }
const mapStateToProps = state => {
    return ({
        note_id: state.notes.currentNote,
        note: filterNotesById(state.notes.currentNote, state.notes.notes),
        detailsVisible: state.notes.detailsVisible
    });
}

const Details = connect(mapStateToProps, mapDispatchToProps)(NoteDetails)

export default Details;