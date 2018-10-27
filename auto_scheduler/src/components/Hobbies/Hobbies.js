import React from 'react';
import './Hobbies.css';

import Hobby from '../Hobby/Hobby.js';

const Hobbies = (props) => {
    return (
        <div className="hobbyCardsCollection">
            {this.props.hobbies.map(hobby => (
                <Hobby hobby={hobby} />
            ))}
        </div>
    )
}

export default Hobbies