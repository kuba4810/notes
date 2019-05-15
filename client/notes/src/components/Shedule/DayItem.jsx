import React, { Component } from 'react';
class DayItem extends Component {

    constructor() {
        super();
        this.state = {
            isActive: false,
            change: false
        }
    }

    showTrainings = () => {
        if (this.props.trainings) {
            let table = this.props.trainings.map(training => (training.id));
            this.props.showTrainings(table, this.props.dayNumber)
        }
    }

    componentDidMount() {
        this.setState({
            isActive: this.props.isActive
        })


    }

    componentDidUpdate(prev, next) {
        // console.log('Nowe propsy !');

        if (prev.isActive !== next.isActive) {
            this.render();
        }
    }
    render() {

        // console.log('Renderuje day...');

        let divStyle={};

        var isEvent = false;
        var dayNumber = this.props.dayNumber;
        if (this.props.dayNumber !== '-') {
            if (this.props.trainings.length > 0) {
                // console.log('Dostałem treningi: ',this.props.trainings)
                isEvent = true;
            }
        }

        let dow = this.props.dow;
        if (dow === 6 && !isEvent) {
            divStyle = {
                backgroundColor: '#b18502'
            }
        } else if (dow === 0 && !isEvent) {
            divStyle = {
                backgroundColor: '#654c01'
            }
        } else if (dow === -1) {
            divStyle = {
                opacity: '0'
            }
        }




        return (
            <div
                className={`dayItem 
                       ${isEvent ? 'dayItemIsEvent' : ''}
                       ${(dayNumber === '-') ? 'dayItemNone' : ''}`}
                onClick={this.showTrainings}
                style={divStyle}
            >
                {this.props.dayNumber}
            </div>);
    }
}

export default DayItem;