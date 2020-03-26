import React from 'react';
import './Form.scss'

const Form = ({children, handleSubmit, handleClick, btnSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>

            <section className="popin-form-container">
                {children}
            </section>

            <div className="popin-form-btn-container">
                <button onClick={handleClick}>Annuler</button>
                <button type="submit">{btnSubmit}</button>
            </div>

        </form>
    )
}

export default Form;
