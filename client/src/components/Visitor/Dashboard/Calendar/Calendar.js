import React, { Component } from 'react'

import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

import './Calendar.scss';

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light',
    lang: 'fr'
};

class Calendar extends React.Component {

    render() {

        let fromMonday = [];
        for (let i = 0; i < 7; i++) {
            fromMonday.push(new Date(2020, 1, 17 + i));
        }

        return (
            <mobiscroll.Form>
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
                                        var selectedWeek = inst.getVal();
                                        console.log(selectedWeek)
                                    }}
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
