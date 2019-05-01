import React, { Component } from 'react';
import { connect } from 'react-redux';

import { labelAdded, labelDeleted, handleLabelChange } from '../../../actions/user';
import { addLabel, deleteLabel, editLabel } from '../../../services/API/user';

class Labels extends Component {
    state = {
        title: ''
    }

    // ADD LABEL
    // ------------------------------------------------------------------------
    addLabel = async () => {

        const user_id = localStorage.getItem('id');

        console.log('edit label jsx : ', this.state.title);


        let res = await addLabel(this.state.title, user_id);

        console.log('Response : ', res);

        if (res.response === 'success') {
            this.props.labelAdded({
                label_id: res.label_id,
                title: this.state.title
            })
        }


        this.setState({
            title: ''
        })
    }

    // ADD LABEL
    // ------------------------------------------------------------------------
    deleteLabel = async (label_id) => {

        const user_id = localStorage.getItem('id');

        let res = await deleteLabel(user_id, label_id);

        if (res.response === 'success') {
            this.props.labelDeleted(label_id)
        }
    }


    // ADD LABEL
    // ------------------------------------------------------------------------
    handleEditLabel = async (id,title) =>{

        console.log('Edit label : ',title)

        const user_id = localStorage.getItem('id');

        let res = await editLabel(user_id, id,title);

    }

    // HANDLE INPUT CHANGE
    // ------------------------------------------------------------------------
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // HANDLE INPUT CHANGE
    // ------------------------------------------------------------------------
    handleLabelChange = (label_id,e) =>{

        this.props.handleLabelChange({
            label_id : label_id,
            title : e.target.value
        })

    }

    // FOCUS INPUT
    // ------------------------------------------------------------------------
    focusInput = (e) => {
        const index = e.target.id.split('-')[1];

        console.log(index);

        const input = document.querySelector(`input#editLInput-${index}`);

        console.log('Znaleziony obiekt to : ', input)
        input.focus();
    }

    // HIDE LABEL EDIT
    // ------------------------------------------------------------------------
    hideLabelEdit = () => {
        let label = document.querySelector('.editLabelContainer');

        label.classList.remove('fadeIn');
        label.classList.add('fadeOut');

        setTimeout(() => {
            label.classList.add('invisible');
        }, 500)

    }

    render() {

        let labels = [...this.props.labels];

        labels = labels.map((label, index) => (
            <li key={index} className="mb-4 editLabelList  d-flex justify-content-between">
                <i className="fas fa-trash mr-2" onClick={this.deleteLabel.bind(null,label.label_id)}></i>
                <input type="text" className="editLabelInput" id={`editLInput-${index}`} value={label.title}
                onChange={this.handleLabelChange.bind(null,label.label_id)} 
                onBlur={this.handleEditLabel.bind(null,label.label_id,label.title)}/>
                <i className="fas fa-check" ></i>
                <i className="fas fa-pen" id={`pen-${index}`}
                    onClick={this.focusInput}></i>
            </li>
        ))
        return (
            <div className="editLabelContainer animated invisible">

                <div className="editLabelContent col-lg-3 col-md-5 col-sm-7 mr-auto ml-auto">
                    <div className="close" onClick={this.hideLabelEdit}>
                        <i className="fas fa-times text-dark"></i>
                    </div>
                    <h5 className="text-dark pl-2 mt-4" >
                        Edytuj etykiety
                    </h5>

                    {/* New label */}
                    <div className="newLabel text-dark d-flex align-items-center justify-content-between pl-4">
                        <input name="title" type="text" placeholder="Nowa etykieta..."
                            value={this.state.title} onChange={this.handleChange} />
                        <i className="fas fa-check" onClick={this.addLabel}></i>
                    </div>

                    {/* Current labels */}
                    <ul className="pl-4 mt-3 text-dark editLabelList">
                        {labels}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = { labelAdded, labelDeleted, handleLabelChange }
const mapStateToProps = state => {
    return {
        labels: state.user.labels
    };
}

const EditLabels = connect(mapStateToProps, mapDispatchToProps)(Labels);

export default EditLabels;