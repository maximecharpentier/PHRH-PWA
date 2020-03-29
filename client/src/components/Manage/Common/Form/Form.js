import React from 'react';
import './Form.scss'

const Form = ({ children, handleSubmit, handleClick, btnSubmit, showMore }) => {
    return (
        <form className="popin-form" onSubmit={handleSubmit}>

            <section className="popin-form-content">
                {children}
            </section>

            {!showMore &&
                <div className="popin-form-btn-container">
                    <button onClick={handleClick}>Annuler</button>
                    <button type="submit">{btnSubmit}</button>
                </div>
            }

        </form>
    )
}

export default Form;
