import React, { Component } from 'react'

import mobiscroll from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

import './Calendar.scss';

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

class Calendar extends React.Component {
    render() {
        let fromMonday = [];
        let fromSaturday = [];
        let twoWeeks = [];

        for (let i = 0; i < 7; i++) {
            fromMonday.push(new Date(2018, 0, 8 + i));
            fromSaturday.push(new Date(2018, 0, 6 + i));
        }

        for (let j = 0; j < 14; j++) {
            twoWeeks.push(new Date(2018, 0, 8 + j));
        }
        return (
            <mobiscroll.Form>
                <div className="mbsc-grid">
                    <div className="mbsc-row">
                        <div className="mbsc-col-sm-12 mbsc-col-md-4">
                            <mobiscroll.FormGroup>
                                <mobiscroll.FormGroupTitle>Mon-Sun</mobiscroll.FormGroupTitle>
                                <mobiscroll.Calendar
                                    selectType="week"
                                    defaultValue={fromMonday}
                                    firstSelectDay={1}
                                    firstDay={1}
                                    display="inline"
                                    type="hidden"
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




const divs = document.querySelectorAll('div')

const doIt = () => {
    for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        if (div.innerText === 'TRIAL') {
            console.log('trial')
            div.remove()
        }
    }
}