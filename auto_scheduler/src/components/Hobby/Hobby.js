import React from 'react';
import './Hobby.css';

const stringToMS = (string) => {
    let timeParts = string.split(":");
    console.log((timeParts[0]*60*60+timeParts[1]*60+timeParts[2])*1000)
    return((timeParts[0]*60*60+timeParts[1]*60+timeParts[2])*1000);
}

const Hobby = (props) => {

    const progressBarStyle = {
        backgroundColor: '#ff660080',
        height: '25px',
        width: `${(stringToMS(props.hobby.progress) / stringToMS(props.hobby.targetTime)) * 100}%`,
    };

    const targetBarStyle = {
        backgroundColor: '#ff660010',
        height: '25px',
        width: `${(1 - stringToMS(props.hobby.progress) / stringToMS(props.hobby.targetTime)) * 100}%`,
    };

    return (
        <div className="hobbyCard">
            
            <div className="hobbyHeader">
                
                <div className="playAndTitle">
                    <button>▶</button>
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
                        <div className='frequency'>PER WEEK</div>
                        {/* <div className='frequency'>M T W Th Sa Su</div> */}
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Hobby