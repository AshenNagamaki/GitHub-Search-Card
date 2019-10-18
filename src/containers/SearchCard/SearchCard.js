import React, {useState, useRef} from 'react';

import classes from './SearchCard.module.css';

const GitHubAPI = 'https://api.github.com/users';

const SearchCard = props => {
    const inputUsername = useRef(null);
    const [username, setUsername] = useState('AxiAxi');

    const keyPressHandler = event => {
        if (event.key === 'Enter') {
            inputUsername.current.focus();
            setUsername(inputUsername.current.value);
        } 
    }

    return (
        <div className={classes.SearchCard}>
            <input 
            className={classes.InputField} 
            type="text" 
            placeholder="Just Type Username and Press Enter"
            ref={inputUsername}
            onKeyPress={keyPressHandler}/>
            {username}
        </div>
    )
}

export default SearchCard;