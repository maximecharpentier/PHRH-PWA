import React from 'react';
import './Nav.scss'


const Nav = ({ children, name, addForm, items }) => {
    return (
        <section className="flex-container">
            <p>{`${items.length} ${name}`}{items.length > 1 && "s"}</p>
            {children}
            <button onClick={addForm}>Ajouter un{name === "urgence" && "e"} {name}</button>
        </section>
    )
}

export default Nav;
