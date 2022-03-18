import React from 'react';
import cl from './MyButton.module.scss'
const MyButton = ({children, ...props}) => {
    return (
        <button className={cl.button} {...props}>
            {children}
        </button>
    );
};

export default MyButton;