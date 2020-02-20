import React from 'react';
import './SearchInput.scss'

const SearchInput = props => {
    return ( 
    <input className="searchInput" placeholder={props.placeholder}/> 
    );
}
 
export default SearchInput;