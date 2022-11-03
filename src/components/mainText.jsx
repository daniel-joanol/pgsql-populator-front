import React from 'react';
import '../styles/mainText.css'

const MainText = () => {
    return (
        <div className='head'>
            <h1>PostgreSQL Populator</h1>
            
            <div className='text'>
                <p>A tool for developers to automatically generate content for a PostgreSQL database.</p>
                <p>The code is available at my personal repository on <a href='https://github.com/daniel-joanol' target='_blank' rel='noreferrer'>Github</a>. You are welcome to contribute to the project!</p>
            </div>
            
        </div>
    );
}

export default MainText;