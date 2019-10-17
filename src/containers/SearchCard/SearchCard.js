import React, {useState, useEffect} from 'react';

import classes from './SearchCard.module.css';

const searchCard = props => {
    const keyPressHandler = event => {
        event.key === 'Enter' ? console.log('Enter') : console.log('Not Enter')
    }

    return (
        <div className={classes.SearchCard}>
            <input 
            className={classes.InputField} 
            type="text" 
            placeholder="Just Type Username and Press Enter" 
            onKeyPress={keyPressHandler}/>
        </div>
    )
}

export default searchCard;