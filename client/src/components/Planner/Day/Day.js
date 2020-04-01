import React, { Component } from "react";
import Hotel from "./../Hotel/Hotel"
import "./Day.scss";

class Day extends Component {
    state = {}
    render() {
        return ( 
            <div className="Day">
                <div className="Day__header">
                    <p className="Day__label">{this.props.label}</p>
                    <p className="Day__date">{this.props.date}</p>
                </div>
                <div className="Day__list">
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                    <Hotel />
                </div>
            </div>
         );
    }
}
 
export default Day;