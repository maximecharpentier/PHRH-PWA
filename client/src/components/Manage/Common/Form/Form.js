import React from 'react';
import './Form.scss'

const Form = ({children, handleSubmit, handleClick, btnSubmit}) => {
    return (
        <form className="popin-form" onSubmit={handleSubmit}>

            <section className="popin-form-content">
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
