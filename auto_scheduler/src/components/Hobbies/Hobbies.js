import React from 'react';
import './Hobbies.css';

import Hobby from '../Hobby/Hobby.js';

const stringToMS = (string) => {
    let timeParts = string.split(":");
    return((timeParts[0]*60*60+timeParts[1]*60+timeParts[2])*1000);
}

const Hobbies = (props) => {

    const populateActiveHobbies = () => {
        let returnArray = [];
        for (let i=0 ; i < props.hobbies.length ; i++){
            if (props.hobbies[i].isActive) returnArray.push(props.hobbies[i])
        }

        function compare(a,b) {
            const aPercentDone = stringToMS(a.progress) / stringToMS(a.targetTime);
            const bPercentDone = stringToMS(b.progress) / stringToMS(b.targetTime);

            if (aPercentDone < bPercentDone) return -1;
            if (aPercentDone > bPercentDone) return 1;
            return 0;
        }

         return returnArray.sort(compare);
    }

    const populateInactiveHobbies = () => {
        let returnArray = [];
        for (let i=0 ; i < props.hobbies.length ; i++){
            if (props.hobbies[i].isActive === false) returnArray.push(props.hobbies[i])
        }

        function compare(a,b) {
            const aPercentDone = stringToMS(a.progress) / stringToMS(a.targetTime);
            const bPercentDone = stringToMS(b.progress) / stringToMS(b.targetTime);

            if (b.autoCompletes) return -2;
            if (aPercentDone < bPercentDone) return -1;
            if (aPercentDone > bPercentDone) return 1;
            return 0;
        }

         return returnArray.sort(compare);
    }

    let activeHobbies = populateActiveHobbies();
    let inactiveHobbies = populateInactiveHobbies();

    return (
        <div className="hobbyCardsCollection">
            {activeHobbies.map(hobby => (
                <div key={hobby._id}>
                    <Hobby hobby={hobby} />
                </div>
            ))}
            {inactiveHobbies.map(hobby => (
                <div key={hobby._id}>
                    <Hobby hobby={hobby} />
                </div>
            ))}
        </div>
    )
}

export default Hobbies