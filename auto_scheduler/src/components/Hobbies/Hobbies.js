import React from 'react';
import './Hobbies.css';

import Hobby from '../Hobby/Hobby.js';
import Break from '../Break/Break.js';

const stringToMS = (string) => {
    let timeParts = string.split(":");
    return((+timeParts[0] * (1000 * 60 * 60)) + (+timeParts[1] * 1000 * 60) + (+timeParts[2] * 1000));
}

const Hobbies = (props) => {

    const orderArray = (arr) => {
        function compare(a,b) {
            const aPercentDone = stringToMS(a.progress) / stringToMS(a.targetTime);
            const bPercentDone = stringToMS(b.progress) / stringToMS(b.targetTime);
            
            let total = aPercentDone - bPercentDone;
            return total;
        }
        
        let pureProgress = arr.sort(compare);
        let breakArr = [];
        let isDueTodayArr = [];
        let notLockedArr = [];
        let notDueTodayArr = [];
        let isCompleteArr = [];
        let isLockedArr = [];

        for (let i=0 ; i < pureProgress.length ; i++){
            const isDueToday = ( pureProgress[i].onDays.length === 1 && pureProgress[i].onDays[0] === 1 ) ||
                                ( pureProgress[i].onDays.length === 7 && pureProgress[i].onDays[new Date().getDay()] );
            const notDueToday = ( pureProgress[i].onDays.length === 7 && ( pureProgress[i].onDays[new Date().getDay()] === 0 ));
            const isComplete = ( stringToMS(pureProgress[i].progress) / stringToMS(pureProgress[i].targetTime) ) >= 1;
            
            if (pureProgress[i].name === 'Break') breakArr.push(pureProgress[i]);
            else if (pureProgress[i].autoCompletes) isLockedArr.push(pureProgress[i]);
            else if (isComplete) isCompleteArr.push(pureProgress[i]);
            else if (isDueToday) isDueTodayArr.push(pureProgress[i]);
            else if (notDueToday) notDueTodayArr.push(pureProgress[i]);
            else notLockedArr.push(pureProgress[i]);
        }

        return [].concat(breakArr, isDueTodayArr, notLockedArr, notDueTodayArr, isCompleteArr, isLockedArr);
    }

    const populateActiveHobbies = () => {
        let arr = [];
        for (let i=0 ; i < props.hobbies.length ; i++){
            if (props.hobbies[i].isActive) arr.push(props.hobbies[i]);
        }

        return orderArray(arr);
    }

    const populateInactiveHobbies = () => {
        let arr = [];
        for (let i=0 ; i < props.hobbies.length ; i++){
            if (props.hobbies[i].isActive === false) arr.push(props.hobbies[i]);
        }
        
        return orderArray(arr);
    }

    let activeHobbies = populateActiveHobbies();
    let inactiveHobbies = populateInactiveHobbies();

    return (
        <div className="hobbyCardsCollection">

            {activeHobbies.map(hobby => (
                <div key={hobby._id}>
                    {hobby.name === "Break" ? 
                    <Break hobby={hobby} toggleHobbyIsActive={props.toggleHobbyIsActive} />
                    :
                    <Hobby hobby={hobby} toggleHobbyIsActive={props.toggleHobbyIsActive} />
                    }
                </div>
            ))}

            {inactiveHobbies.map(hobby => (
                <div key={hobby._id}>
                    {hobby.name === "Break" ? 
                    <Break hobby={hobby} toggleHobbyIsActive={props.toggleHobbyIsActive} />
                    :
                    <Hobby hobby={hobby} toggleHobbyIsActive={props.toggleHobbyIsActive} />
                    }
                </div>
            ))}
            
        </div>
    )
}

export default Hobbies;