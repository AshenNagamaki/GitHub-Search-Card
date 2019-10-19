import React from 'react';

import classes from './CardHead.module.css';

const CardHead = props => {    
    let locationPart = null;

    if (props.location) {
        let locationURL = `https://www.google.com/maps/place/${props.location}`;
        locationPart = (
            <a
            href={locationURL}
            target="_blank" 
            title={props.location}
            rel="noopener noreferrer">
                <h2 className={classes.Location}>{props.location}</h2>
            </a>
        );
    } else {
        locationPart = <h2 className={classes.Location} style={{cursor: "default"}}>Somewhere on Earth</h2>;
    }

    let bioPart = null;
    
    if (props.bio) {
        bioPart = (
            <p className={classes.Bio}>{`«${props.bio}»`}</p>
        );
    } else {
        bioPart = <p className={classes.Bio}>Silence speaks it all...</p>
    }

    return (
        <div className={classes.CardHead}>
            <a
            href={props.homePageURL}
            target="_blank" 
            title={props.login || props.name}
            rel="noopener noreferrer">
                <img className={classes.Avatar} src={props.avatar_url} alt={props.login || props.name}/>
            </a>
            <a 
            href={props.homePageURL}
            target="_blank"
            title={props.login || props.name}
            rel="noopener noreferrer">
                <h2 className={classes.Username}>{props.name || props.login}</h2>
            </a>
            {locationPart}
            {bioPart}
        </div>
    )
}

export default CardHead;