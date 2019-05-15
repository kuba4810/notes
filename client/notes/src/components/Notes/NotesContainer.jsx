import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Header from '../Header';
import { Router as Router, Route } from 'react-router-dom';
import NoteListContainer from './NotesList/NoteListContainer';
import GarbageContainer from './Garbage/GarbageContainer';
import ArchiveContainer from './Archive/ArchiveContainer';

import NoteDetails from './Details/NoteDetails';
import EditLabels from './Labels/EditLabels';

import { connect } from 'react-redux';
import { fetchAllNotes } from '../../services/API/notes';
import {getLabels} from '../../services/API/user';

import { notesFetched} from '../../actions/notes';
import {labelsFetched, currentLabelChanged} from '../../actions/user';

// Services
import history from '../../services/history';

class Container extends Component {
    state = {
        isLoading : true,
        notes : []
    }

    componentDidMount = async () => {
        const user_id = localStorage.getItem('id');

        try {
            let res = await fetchAllNotes(user_id);
            console.log(res);

            if (res.response === 'success') {
                this.props.notesFetched(res.notes);
            }

            res = await getLabels(user_id);

            console.log('Pobrane labelki : ',res);

            if(res.response === 'success'){
                this.props.labelsFetched(res.labels)
            }

        } catch (error) {
            console.log(error);

        }

    }

    componentWillMount(){
        if(!localStorage.getItem('id')){
            history.push('/');
        }      
    }

    // SHOW LABEL EDIT
    // ------------------------------------------------------------------------
    showLabelEdit = () =>{

        let label = document.querySelector('.editLabelContainer');

        label.classList.remove('invisible');
        label.classList.remove('fadeOut');
        label.classList.add('fadeIn');

    }

    

    render() {

        let labels = [...this.props.labels];

        console.log('Labels ...',labels);

        labels = labels.map(label =>               
                 <li className="etiquete-li" 
                    onClick={this.props.currentLabelChanged.bind(null,label.title)}>  <i class="fas fa-bookmark mr-2"></i> {label.title} </li>  
                 )
        return (
            <div className="notesContainer f-color-cornsilk">
                <NoteDetails />
                <Header />
                <EditLabels />
                <div className="row">
                
                    <div className="col col-3 notesNavBar d-lg-block d-none f-color-cornsilk pt-3">

                        <h5>Menu</h5>
                        <hr className="bg-light" />
                        <ul className="mr-auto ml-auto notesMenuUl">

                            <li onClick={this.props.currentLabelChanged.bind(null,"")}>
                                <NavLink to={'/notatki'}exact activeClassName="activeNavLink" >
                                    <i class="fas fa-lightbulb mr-1"></i>
                                    Notatki
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to={'/notatki/archiwum'} activeClassName="activeNavLink">
                                    <i class="fas fa-history mr-1"></i>
                                    Archiwum
                               </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/notatki/kosz'} activeClassName="activeNavLink">
                                    <i class="fas fa-trash-alt mr-1"></i>
                                    Kosz
                                </NavLink>
                            </li>
                        </ul>


                        <h5>Etykiety</h5>
                        <hr className="bg-light" />
                        <ul className="etiquette">
                            <li onClick={this.showLabelEdit}>
                                <i class="fas fa-pen mr-2"></i>  Edytuj etykiety
                            </li>
                            {labels}
                        </ul>
                        

                    </div>

                    <div className="notesContent col col-lg-9  m-height-100 ml-auto mr-auto f-color-dark overflow-scroll position-relative">
                              
                              <Route exact  path={`${this.props.match.path}`} component={NoteListContainer} />
                              <Route  path={`${this.props.match.path}/kosz`} component={GarbageContainer} />
                              <Route  path={`${this.props.match.path}/archiwum`} component={ArchiveContainer} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = { notesFetched, labelsFetched, currentLabelChanged };
const mapStateToProps = state => {
    return {
        notes: state.notes,
        labels : state.user.labels
    };
}

const NotesContainer = connect(mapStateToProps, mapDispatchToProps)(Container);

export default NotesContainer;