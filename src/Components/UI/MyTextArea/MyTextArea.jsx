import React from 'react';
import cl from './MyTextArea.module.scss'
const MyTextArea = (props) => {
    return (
        <textarea {...props} className={cl.textarea}/>

    );
};

export default MyTextArea;