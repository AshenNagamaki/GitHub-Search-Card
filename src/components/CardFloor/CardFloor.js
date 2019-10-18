import React from 'react';

import classes from './CardFloor.module.css';

const CardFloor = props => {
    const followersURL = `${props.homePageURLPart}/followers`;
    const reposURL = `${props.homePageURLPart}?tab=repositories`;
    const followingURL = `${props.homePageURLPart}/following`;
    
    return (
    <div className={classes.CardFloor}>
        <ul className={classes.List}>
            <li>
                <a 
                href={followersURL}
                target="_blank" 
                title="Followers Number" 
                rel="noopener noreferrer">
                    <i className={classes.Number}>{props.followers}</i>
                    <br />  
                    <i>Followers</i>
                </a>
            </li>
            <li>
                <a 
                href={reposURL}
                target="_blank" 
                title="Repositories Number" 
                rel="noopener noreferrer">
                    <i className={classes.Number}>{props.repos}</i>
                    <br />  
                    <i>Repositories</i>
                </a>
            </li>
            <li>
                <a 
                href={followingURL}
                target="_blank" 
                title="Following Number" 
                rel="noopener noreferrer">
                    <i className={classes.Number}>{props.following}</i>
                    <br />  
                    <i>Following</i>
                </a>
            </li>
        </ul>
    </div>
    )
}

export default CardFloor;