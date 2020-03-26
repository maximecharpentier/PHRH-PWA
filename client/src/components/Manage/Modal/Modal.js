import React from 'react';
import Close from '../../../assets/close'
import './Modal.scss'


const Modal = ({ children, title, handleClick }) => {
    return (
        <>
            <div className="backgroundBody"></div>
            <div className="popin-form">
                <div className="popin-header">
                    <h2>{title}</h2>
                    <span onClick={handleClick}><Close /></span>
                </div>
                {children}
            </div>
        </>
    )
}

export default Modal;
