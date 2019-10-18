import React, {useState, useRef, useEffect} from 'react';

import CardHead from '../../components/CardHead/CardHead';
import CardFloor from '../../components/CardFloor/CardFloor';
import classes from './SearchCard.module.css';

const GitHubAPI = 'https://api.github.com/users';

const SearchCard = () => {
    const inputUsername = useRef(null);
    const [username, setUsername] = useState('AxiAxi');
    const [userData, setUserData] = useState({
        userNameFromAPI: null,
        userLogin: null,
        userHomePageURL: null,
        userAvatar: null,
        userLocation: null,
        userBio: null,
        userFollowers: null,
        userPublicRepos: null,
        userFollowing: null
    });

    useEffect(() => {
        const url = `${GitHubAPI}/${username}`;
        const abortController = new AbortController();
        fetch(url, {signal: abortController.signal})
        .then(response => response.json()
        .then(responseData => {
            setUserData({
                userNameFromAPI: responseData.name,
                userLogin: responseData.login,
                userHomePageURL: responseData.html_url,
                userAvatar: responseData.avatar_url,
                userBio: responseData.bio,
                userLocation: responseData.location,
                userFollowers: responseData.followers,
                userPublicRepos: responseData.public_repos,
                userFollowing: responseData.following
            });
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
            location={userData.userLocation}
            bio={userData.userBio}/>
            <CardFloor 
            homePageURLPart={userData.userHomePageURL}
            followers={userData.userFollowers}
            repos={userData.userPublicRepos}
            following={userData.userFollowing}/>
        </div>
    )
}

export default SearchCard;