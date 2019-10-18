import React, {useState, useRef, useEffect} from 'react';

import CardHead from '../../components/CardHead/CardHead';
import CardFloor from '../../components/CardFloor/CardFloor';
import classes from './SearchCard.module.css';

const GitHubAPI = 'https://api.github.com/users';

const SearchCard = () => {
    const inputUsername = useRef(null);
    const [username, setUsername] = useState('AxiAxi');
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
        userNameFromAPI: null,
        userLogin: null,
        userHomePageURL: null,
        userAvatar: null
    });

    useEffect(() => {
        const url = `${GitHubAPI}/${username}`;
        const abortController = new AbortController();
        setIsLoading(true);
        fetch(url, {signal: abortController.signal})
        .then(response => response.json()
        .then(responseData => {
            setUserData({
                userNameFromAPI: responseData.name,
                userLogin: responseData.login,
                userHomePageURL: responseData.html_url,
                userAvatar: responseData.avatar_url
            });
            setIsLoading(false);
            console.log(responseData); //TODO Delete
        }))
        return () => {
            abortController.abort();
        }
    }, [username])

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
            <CardHead 
            name={userData.userNameFromAPI} 
            login={userData.userLogin} 
            homePageURL={userData.userHomePageURL} 
            avatar_url={userData.userAvatar}
            loading={isLoading}/>
            <CardFloor />
        </div>
    )
}

export default SearchCard;