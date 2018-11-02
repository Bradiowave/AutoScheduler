import React from 'react';
import { stringToMS } from '../../helperFunctions/helperFunctions.js';
import './Hobby.css';

const Hobby = (props) => {

    const determineClassName = () => {
        const percentDone = stringToMS(props.hobby.progress) / stringToMS(props.hobby.targetTime);
        let className = props.hobby.addsToBreak ? 'hobbyCard' : 'hobbyCardLocked';
        className += percentDone >= 1 ? 'Complete' : '';
        return className;
    }

    const progressBarStyle = {
        backgroundColor: `${props.hobby.color}80`,
        height: '25px',
        width: `${(stringToMS(props.hobby.progress) / stringToMS(props.hobby.targetTime)) * 100}%`,
    };

    const targetBarStyle = {
        backgroundColor: `${props.hobby.color}10`,
        height: '25px',
        width: `${(1 - stringToMS(props.hobby.progress) / stringToMS(props.hobby.targetTime)) * 100}%`,
    };

    const createFrequencyText = () => {
        const onDays = props.hobby.onDays;
        if (onDays.length === 1) {
            if (onDays[0]) return 'PER DAY';
            return 'PER WEEK';
        }
        const days = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];
        let daystring = '';
        for (let i=0 ; i < onDays.length ; i++){
            if (onDays[i]) daystring += `${days[i]} `;
        }
        return daystring;
    }

    return (
        <div className={determineClassName()}>
            
            <div className="hobbyHeader">
                
                <div className="playAndTitle">
                    <button onClick={() => props.toggleHobbyIsActive(props.hobby._id)}>{props.hobby.isActive ? '⏹' : '▶'}</button>
                    <div className="hobbyTitle">{props.hobby.name}</div>
                </div>
                
                <button>✏</button>

            </div>

            <div className="hobbyTimeBar">
                
                <div className="entireBar">
                    <div style={progressBarStyle}></div>
                    <div style={targetBarStyle}></div>
                </div>
                
                <div className="barInfo">

                    <div className="progressTime">{props.hobby.progress}</div>

                    <div className="targetTimeAndFrequency">
                        <div className="targetTime">{props.hobby.targetTime}</div>
                        <div className='frequency'>{createFrequencyText()}</div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Hobby;