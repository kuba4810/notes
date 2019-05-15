import React, { Component } from 'react';
import { SketchPicker } from 'react-color'
import { log } from 'util';
import { connect } from 'react-redux';
import { noteAdded } from '../../../actions/notes';

const state = {
    color: '#fff',
    colorPicker: 'hidden',
    label: 'hidden',
    form: 'none',
    title: '',
    content: '',
    name: '',
    labels: [],
    tasks: [],
    taskName : '',
    tasksEditingMode :false,
    labelsPrompt: ['Zakupy', 'Sprzątanie'],
    
}

class Note extends Component {
    state = {
        color: '#fff',
        colorPicker: 'hidden',
        label: 'hidden',
        form: 'none',
        title: '',
        content: '',
        name: '',
        labels: [],
        tasks: [],
        labelsPrompt: ['Zakupy', 'Sprzątanie']
    }

    handleChange = e => {
        
            this.setState({
                [e.target.name]: e.target.value
            })
        
    }
    // Set note color
    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
    };

    // Change note color 
    // --------------------------------------------------------------
    changeColor = (e) => {

        console.log(e.target);

        let color = '#' + e.target.id.slice(2, e.target.length);

        console.log(color);

        this.setState({
            color: color
        })

        this.hideColorPicker();
    }


    // Color picker visibility
    // ---------------------------------------------------------------
    showColorPicker = () => {

        if (this.state.colorPicker === 'hidden') {
            this.setState({
                label: 'hidden',
                colorPicker: 'visible'
            })
        } else {
            this.setState({
                colorPicker: 'hidden'
            })
        }

    }

    hideColorPicker = () => {
        this.setState({
            colorPicker: 'hidden'
        })
    }

    // Label form visibility
    // ---------------------------------------------------------------
    showLabelForm = () => {
        this.setState({
            colorPicker: 'hidden',
            label: 'visible',
            name: ''

        })
    }

    hideLabelForm = () => {



        this.setState({
            label: 'hidden'
        })

        if (this.state.name.length > 0) {
            let labels = this.state.labels;
            if(!this.state.labels.find((el)=>{
                return el === this.state.name
            })){
            labels.push(this.state.name);
            }
            this.setState({
                labels: [...labels]
            }, () => {
                console.log(this.state.labels);

            })
        }


    }

    // Main form visibility
    // ---------------------------------------------------------------
    showForm = () => {
        if (this.state.form === 'none') {
            this.setState({
                form: 'block'
            })
        } else {
            this.setState({
                form: 'none'
            })
        }

    }

    hideForm = () => {
        this.setState(state)
        this.setState({
            labels: [],
            tasks: []
        })
    }
    // ---------------------------------------------------------------

    addLabel = (e) => {

        console.log('CheckBox : ', e.target.value)

        let labels = this.state.labels;

        if (e.target.checked) {

            labels.push(e.target.value)

            this.setState({
                labels
            })
        } else {
            labels = labels.filter(label => (label !== e.target.value))

            this.setState({
                labels
            })
        }
    }
    createNote = async () => {
        // Prepare data object
        let s = this.state;
        let data = {
            userId: localStorage.getItem('id'),
            title: s.title,
            content: s.content,
            creationDate: '2019-02-01,20:00',
            color: s.color,
            label: s.labels.join(','),
            tasks: s.tasks
        }


        try {
            // Request to API
            let response = await fetch('http://localhost:8080/api/note', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin", //

                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Get response body
            response = await response.json();

            // Check new note result
            if (response.response === 'success') {
                this.props.noteAdded(response.note);
                this.hideForm();

            } else {

                alert('Błędny login lub hasło !');

            }


        } catch (err) {
            alert('Wystąpił błąd, spróbuj ponownie później !')
            console.log(err);

        }
    }

    deleteTask = (id) =>{

        let tasks = this.state.tasks.filter(task => (task.id !== id));

        this.setState({
            tasks
        })


    }

    newTask = () =>{
        let task = {
            id : new Date().getTime(),
            name : this.state.taskName,
            done : false
        }

        let tasks = this.state.tasks;

        tasks.push(task);

        this.setState({
            tasks,
            taskName : ''
        },()=>{
            console.log(this.state);
        })
    }
    addTasks = () =>{
        this.setState({
            tasksEditingMode : !this.state.tasksEditingMode
        })
    }
    render() {

        let tasks = this.state.tasks.map( (task,index)=>( 
            <div className=" tasks d-flex align-items-center mt-1">
                <input className="mr-2 " type="checkbox" name="" id=""/>
                <span className="form-control">
                    {task.name}
                </span>   
                <i className="fas fa-times" onClick={this.deleteTask.bind(this,task.id)}></i>
            </div>
         ))

        let labels = this.state.labels.map(l => (<div className="bg-secondary single-label radius-15 p-2 mr-1 text-center"> {l} </div>))

        let labelsPromptList = this.props.labels.map(label => {

            if (this.state.labels.find((element)=>{
                return element === label.title
            }) ){

                return (
                    <li className="labelCheck">
                        <input type="checkbox" name="" value={label.title} checked onClick={this.addLabel} /> {label.title}
                    </li>
                ) 
            }else {
                return (<li className="labelCheck">
                    <input type="checkbox" name="" value={label.title}  onClick={this.addLabel} /> {label.title}
                </li>)
            }


        })

        return (
            <div className="position-relative " id="newNote" >
                {/* Row */}
                <div className="row">
                    {/* Col 6 */}
                    <div className="col-lg-6  col-md-8">

                        {/* New note button */}
                        <div className="d-flex align-items-center">

                            <i class="fas fa-plus m-2 f-size-25 cursor-pointer"
                                data-toggle="collapse" data-target="#demo"

                                onClick={this.showForm}>
                            </i>
                            Nowa notatka

                        </div>

                        {/* Form */}
                        <form className="newNoteForm f-color-dark mt-3 mb-3"
                            action="javascript:(void);"
                            style={{ 'backgroundColor': this.state.color, display: this.state.form }}>

                            <div className="form-group">

                                {/* Title */}
                                <input type="text"
                                    className="form-control mb-2"
                                    name="title"
                                    placeholder="Tytuł..."
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                    value={this.state.title}
                                />

                                {/* Content */}
                                <textarea
                                    className="note-content"
                                    name="content" id="" cols="30" rows="3" className="form-control"
                                    placeholder="Treść..."
                                    onChange={this.handleChange}
                                    value={this.state.content}
                                    wrap="hard"
                                >
                                </textarea>

                                {/* Labels list */}

                                <div className="form-group ">
                                    {labels}
                                </div>

                            </div>

                            <div className="form-group mb-2">
                                {tasks}
                            </div>

                            {
                                this.state.tasksEditingMode &&
                                <div className="form-group mb-3">

                                    <div className="d-flex align-items-center w-100 newTask">
                                        <i className="fas fa-plus"></i>
                                        <input className="form-control" type="text" name="taskName" onChange={this.handleChange}
                                        placeholder="Nazwa zadania" value={this.state.taskName}/>
                                        <i className="fas fa-check" onClick={this.newTask}></i>

                                    </div>
                                
                                </div>
                            }

                            <div className="form-group">

                                {/* Properties */}
                                <div className="row">
                                    {/* Col 10 */}
                                    <div className="col-9  d-flex">
                                        {/* Note background color */}
                                        <div class=" tip">
                                            <i class="fas fa-palette ml-2 f-size-21"
                                                onClick={this.showColorPicker}></i>
                                            <span class="tooltiptext">Zmień kolor</span>
                                        </div>

                                        <div class="tip">
                                            <i class="fas fa-check-square ml-2 f-size-21"
                                                onClick={this.addTasks}></i>
                                            <span class="tooltiptext">Dodaj zadania</span>
                                        </div>




                                        {/* Color picker */}
                                        <div className="color-picker  position-absolute  mt-4 ml-2  bg-light justify-content-end"
                                            style={{ 'visibility': this.state.colorPicker }}>
                                            <div className="colorPicker p-2">

                                                <div className="color" id="c-ffffff"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-dedede"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-c8ec7f"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-f4b82d"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-f68b8b"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-fbf37d"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-97ffe6"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-3dd8b5"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-d7aefb"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-fdcfe8"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-e6c9a8"
                                                    onClick={this.changeColor}>
                                                </div>

                                                <div className="color" id="c-e8eaed"
                                                    onClick={this.changeColor}>
                                                </div>



                                            </div>
                                        </div>

                                        {/* Add label */}
                                        {/* ------------------------------------------------------- */}

                                        {/* Icon */}


                                        <div class=" tip">
                                            <i class="fas fa-tag ml-3" onClick={this.showLabelForm}></i>
                                            <span class="tooltiptext">Etykiety</span>
                                        </div>

                                        <div
                                            className="position-absolute pt-1 pl-2 pr-2 pb-2 mt-4 bg-light labelForm"
                                            style={{ 'visibility': this.state.label }}>

                                            <form
                                                className="noteLabel position-relative"
                                                action="javascript:(void);">
                                                <label htmlFor="name">
                                                    Etykieta notatki
                                                    <i class="fas fa-times ml-5" onClick={this.hideLabelForm}></i>
                                                </label>
                                                {/* Label name */}
                                                <input name="name" type="text"
                                                    className="form-control p-0"
                                                    placeholder="Nazwa etykiety..."
                                                    autoComplete="off"
                                                    value={this.state.name}
                                                    onChange={this.handleChange} />
                                                <i class="fas fa-check mr-2 " onClick={this.hideLabelForm}></i>

                                                <ul className="labelPromptList">
                                                    {labelsPromptList}
                                                </ul>

                                                {/* Labels prompt list */}
                                                {/* <div className="labelPrompt position-absolute text-dark">
                                                    <ul className="labelPromptList">
                                                        {labelsPromptList}
                                                    </ul>
                                                </div> */}
                                            </form>
                                        </div>

                                    </div>

                                    {/* Col 2 */}
                                    <div className="col-3">
                                        {/* Create note */}
                                        <div class="tip">
                                            <i class="fas fa-check mr-4 f-size-25 text-success"
                                                onClick={this.createNote}>
                                            </i>
                                            <span class="tooltiptext">Dodaj notatke</span>
                                        </div>

                                        {/* Reject note */}
                                        <div class="tip">
                                            <i class="fas fa-times f-size-25 text-danger"
                                                onClick={this.hideForm}></i>
                                            <span class="tooltiptext">Odrzuć</span>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchtoProps = { noteAdded };
const mapStateToProps = state => {
    return {
        notes: state.notes,
        labels: state.user.labels
    };
};

const NewNote = connect(mapStateToProps, mapDispatchtoProps)(Note);

export default NewNote;