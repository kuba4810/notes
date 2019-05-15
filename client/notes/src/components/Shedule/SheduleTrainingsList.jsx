import React, { Component } from 'react';


class SheduleTrainingsList extends Component {
    state = {  }
   
    render() { 
        // console.log('Lista dostała takie treningi', this.props.trainingsList)
        let items='';
        items = this.props.trainingsList.map((tr, index) => (
            <div
                className="sheduleListItem  animated fadeInDown"
                style={{ animationDelay: `.${index}s` }}
                onClick={this.props.showDetails.bind(null, tr.training_id)} >
                {tr.name},  {tr.date.split(',')[1]}

            </div>
            ));

        return ( 
            <div className="sheduleList">               
                    {items}               
            </div>
         );
    }
}
 
export default SheduleTrainingsList;