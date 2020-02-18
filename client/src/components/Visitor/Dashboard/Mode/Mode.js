import React, { Component } from 'react'

class Mode extends Component {
    state = {}
    render() { 
        return (
            <div className="Mode">
                <p>dvbedb</p>
                <button className="Mode__button">
                    <svg className="Mode__icon">
                        <use xlink="/client/src/assets/svg/ui.svg#menu"></use>
                    </svg>
                </button>
                <button className="Mode__button">
                    <svg className="Mode__icon">
                        <use xlink="/client/src/assets/svg/ui.svg#grid"></use>
                    </svg>
                </button>
            </div>
        );
    }
}
 
export default Mode;