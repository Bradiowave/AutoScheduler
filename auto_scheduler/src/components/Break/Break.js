import React from 'react';
import './Hobby.css';

const stringToMS = (string) => {
    let timeParts = string.split(":");
    return((+timeParts[0] * (1000 * 60 * 60)) + (+timeParts[1] * 1000 * 60) + (+timeParts[2] * 1000));
}

const Hobby = (props) => {

    const determineClassName = () => {
        const percentDone = stringToMS(props.hobby.progress) / stringToMS(props.hobby.targetTime);
        let className = props.hobby.autoCompletes ? 'hobbyCardLocked' : 'hobbyCard';
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
                        <div className='frequency'>TO USE</div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Hobby