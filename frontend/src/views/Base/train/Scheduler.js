import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import './Scheduler.css';
 
const scheduler = window.scheduler;
 
export default class Scheduler extends Component {
    componentDidMount() {
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        scheduler.init(this.schedulerContainer);
        this.loadData()
    }

    loadData(){
        if (this.props!==undefined) {
            const { events } = this.props;
            scheduler.clearAll();
            scheduler.parse(events);
        }
        else {
            console.log("undefined data")
        }
    }
 
    render() {
        this.loadData()

        return (
            <div
                ref={ (input) => { this.schedulerContainer = input } }
                style={ { width: '100%', height: '100%' } }
            >
            </div>
       );
    }
}