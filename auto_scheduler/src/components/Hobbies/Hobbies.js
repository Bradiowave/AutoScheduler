import React from 'react';
import './Hobbies.css';

import Hobby from '../Hobby/Hobby.js';

const Hobbies = (props) => {
    return (
        <div className="hobbyCardsCollection">
            {props.hobbies.map(hobby => (
                <div key={hobby._id}>
                    <Hobby hobby={hobby} />
                </div>
            ))}
        </div>
    )
}

export default Hobbies