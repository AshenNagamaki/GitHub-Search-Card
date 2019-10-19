import React from 'react';

import classes from './ErrorCard.module.css';
import cuteImage from '../../assets/cuteImage.png';

const ErrorCard = () => {
    return (
        <div className={classes.ErrorCard}>
            <img className={classes.CuteImage} src={cuteImage} alt="Your problem is my problem!"/>
            <h2 className={classes.Ooops}>Ooops!!!</h2>
            <h3 className={classes.Message}>Looks like something went wrong!</h3>
        </div>
    )
}

export default ErrorCard;