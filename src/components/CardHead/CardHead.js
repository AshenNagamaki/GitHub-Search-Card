import React from 'react';

import classes from './CardHead.module.css';

const CardHead = props => {
    return (
        <div className={classes.CardHead}>
            <a
            href={props.homePageURL} 
            target="_blank" 
            title={props.login || props.name}
            rel="noopener noreferrer">
                <img className={classes.Avatar} src={props.avatar_url} alt={props.login || props.name}/>
            </a>
        </div>
    )
}

export default CardHead;