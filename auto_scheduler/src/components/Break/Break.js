import React from 'react';
import { stringToMS, msToString } from '../../helperFunctions/helperFunctions.js';
import './Break.css';


const Break = (props) => {
    const determineClassName = () => {
        const percentDone = stringToMS(props.hobby.progress) / stringToMS(props.hobby.targetTime);
        let className = 'breakCard';
        className += percentDone >= 1 ? 'Complete' : '';
        return className;
    }

    const calculateBreakTime = () => {
        let hobbies = props.hobbies;
        let totalProgress = 0;
        let totalTarget = 0;
        
        for (let i=0 ; i < hobbies.length ; i++){
            if (hobbies[i].addsToBreak) {
                totalProgress += Math.min(stringToMS(hobbies[i].progress), stringToMS(hobbies[i].targetTime));
                totalTarget += stringToMS(hobbies[i].targetTime);
            }
        }

        return msToString( ( stringToMS(props.hobby.targetTime) * (totalProgress / totalTarget) ) - stringToMS(props.hobby.progress) );
    }

    const progressBarStyle = {
        backgroundColor: `${props.hobby.color}80`,
        height: '25px',
        width: `${(stringToMS(calculateBreakTime()) / stringToMS("00:30:00")) * 100}%`,
    };

    const targetBarStyle = {
        backgroundColor: `${props.hobby.color}10`,
        height: '25px',
        width: `${(1 - stringToMS(calculateBreakTime()) / stringToMS("00:30:00")) * 100}%`,
    };

    return (
        <div className={determineClassName()}>
            
            <div className="breakHeader">
                
                <div className="playAndTitle">
                    <button onClick={() => props.toggleHobbyIsActive(props.hobby._id)}>{props.hobby.isActive ? '⏹' : '▶'}</button>
                    <div className="breakTitle">{props.hobby.name}</div>
                </div>
                
                <button>✏</button>

            </div>

            <div className="breakTimeBar">
                
                <div className="entireBar">
                    <div style={progressBarStyle}></div>
                    <div style={targetBarStyle}></div>
                </div>
                
                <div className="barInfo">

                    <div className="progressTime">{props.hobby.progress}</div>

                    <div className="targetTimeAndFrequency">
                        <div className="targetTime">{calculateBreakTime()}</div>
                        <div className='frequency'>TO USE</div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Break;