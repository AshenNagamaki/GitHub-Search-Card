import React, {useState, useRef, useEffect} from 'react';

import CardHead from '../../components/CardHead/CardHead';
import CardFloor from '../../components/CardFloor/CardFloor';
import ErrorCard from '../../components/ErrorCard/ErrorCard';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './SearchCard.module.css';

const GitHubAPI = 'https://api.github.com/users';

const SearchCard = () => {
    const inputUsername = useRef(null);
    const [username, setUsername] = useState('npm');
    const [isLoading, setIsLoading] = useState(false);
    const [isOrganization, setIsOrganization] = useState(null);
    const [error, setError] = useState(null);
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
        setIsLoading(true);
        fetch(url, {signal: abortController.signal})
        .then(response => response.json())
        .then(responseData => {
            if (!responseData.message) {
                responseData.type === 'Organization' ? setIsOrganization(true) : setIsOrganization(false);
                setUserData({
                    userNameFromAPI: responseData.name,
                    userLogin: responseData.login,
                    userHomePageURL: responseData.html_url,
                    userAvatar: responseData.avatar_url,
                    userBio: responseData.bio,
                    userLocation: responseData.location,
                    userFollowers: responseData.type !== 'Organization' ? responseData.followers : 'Many',
                    userPublicRepos: responseData.public_repos,
                    userFollowing: responseData.type !== 'Organization' ? responseData.following : 'Many'
                });
                setError(null);
            } else {
                setError(responseData.message);
            }
            setIsLoading(false);
        })
        .catch(responseError => {
            setIsLoading(false);
            setError(responseError);
        })
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

    let searchCardContent = null;

    if (!isLoading) {
        searchCardContent = (
            <React.Fragment>
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
                following={userData.userFollowing}
                orgType={isOrganization}/>
            </React.Fragment>
        );
    } else {
        searchCardContent = <Spinner>Loading...</Spinner>
    }

    return (
        <div className={classes.SearchCard}>
            <input 
            className={classes.InputField} 
            type="text" 
            placeholder="Just Type Username and Press Enter"
            ref={inputUsername}
            onKeyPress={keyPressHandler}/>
            {error ? <ErrorCard /> : searchCardContent}
        </div>
    )
}

export default SearchCard;