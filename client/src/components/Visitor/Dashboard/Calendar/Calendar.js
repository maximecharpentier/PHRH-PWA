import React, { Component } from 'react'

import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import './Calendar.scss';

mobiscroll.settings = {
    lang: 'fr',
    layout: 'fixed',
    maxWidth: '1',
    rows: 3
};

class Calendar extends Component {
    state = {}
    render() {

        let fromMonday = [];
        for (let i = 0; i < 7; i++) {
            fromMonday.push(new Date(2020, 1, 17 + i));
        }

        return (
            <mobiscroll.Form className="Calendar">
                <div className="mbsc-grid">
                    <div className="mbsc-row">
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.Calendar
                                    dateFormat="yy.mm.dd"
                                    selectType="week"
                                    defaultValue={fromMonday}
                                    firstSelectDay={1}
                                    firstDay={1}
                                    display="inline"
                                    type="hidden"
                                    onDayChange={function (event, inst) {
                                        this.setState({
                                            myDate: inst.getVal()
                                        });
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
