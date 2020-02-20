import React, { Component, useState, useContext } from 'react'

import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import './Calendar.scss';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            week: [],
            defaultValue: []
        }
    }

    componentWillMount() {
        let fromMonday = [];
        let defaultValue = [];
        for (let i = 0; i < 7; i++) {
            var newDate = new Date(2020, 1, 17 + i);
            defaultValue.push(new Date(2020, 1, 17 + i));
            fromMonday.push({ day: newDate.getDate(), month: newDate.getMonth() });
        };

        this.setState({
            week: fromMonday,
            defaultValue: defaultValue
        })
    }
    render() {

        return (
            <mobiscroll.Form>
                <div className="mbsc-grid">
                    <div className="mbsc-row">
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.Calendar
                                    dateFormat="yy.mm.dd"
                                    selectType="week"
                                    defaultValue={this.state.defaultValue}
                                    firstSelectDay={1}
                                    firstDay={1}
                                    display="inline"
                                    type="hidden"
                                    onDayChange={function (event, inst) {
                                        setTimeout(function () {
                                            var selectedWeek = inst.getVal();
                                            var daysFormat = [];
                                            selectedWeek.map(day => daysFormat.push({ day: day.getDate(), month: day.getMonth() }))
                                            this.setState({
                                                week: daysFormat
                                            })
                                        }.bind(this), 100);
                                    }.bind(this)}
                                />
                            </mobiscroll.FormGroup>
                        </div>
                    </div>
                </div>
            </mobiscroll.Form>
        );
    }
}

export default Calendar;

/*
const doIt = () => {
    const divs = document.querySelectorAll('div')
    for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        if (div.innerText === 'TRIAL') {
            div.innerText = '';
            console.log('trial')
        }
    }
}
*/
