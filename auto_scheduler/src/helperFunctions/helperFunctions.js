//========== Universal Helpers ==========//

export const stringToMS = (string) => {
    let timeParts = string.split(":");
    let maybeNegative = 1;
    if (timeParts[0] === '-'){
      maybeNegative = -1;
      timeParts = timeParts.substring(1);
    }
    return( ((+timeParts[0] * (1000 * 60 * 60)) + (+timeParts[1] * 1000 * 60) + (+timeParts[2] * 1000)) * maybeNegative );
  }
  
export const msToString = (duration) => {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)));
    let sign = (seconds < 0) ? '-' : '';

    hours = (hours < 10 && hours > -10) ? "0" + Math.abs(hours) : Math.abs(hours);
    minutes = (minutes < 10 && minutes > -10) ? "0" + Math.abs(minutes) : Math.abs(minutes);
    seconds = (seconds < 10 && seconds > -10) ? "0" + Math.abs(seconds) : Math.abs(seconds);

    return sign + hours + ":" + minutes + ":" + seconds;
}

export const getMillisecondsToMonday = () => {
  let now = new Date();
  let offsetDays = ( ( ( 7 - now.getDay() ) % 7 ) + 1 );

  let nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate()+offsetDays);

  return nextMonday - now;
};

export const getMillisecondsSinceMonday = () => {
  let now = new Date();
  let offsetDays = ( ( ( 7 - now.getDay() ) % 7 ) - 6 );

  let thisLastMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate()+offsetDays);

  return now - thisLastMonday;
};

//========== App.js Helpers ==========//

export const initializeBreak = (state) => {
    let aHobbyIsActive = false;
    const findTargetTime = () => {
      let totalHobbyTime = 0;
      for (let i=0 ; i < state.hobbies.length ; i++) {
        let msPerWeek = 0;
        let obj = state.hobbies[i];
        if (obj.name === "Break") continue;
        else if (obj.isActive) aHobbyIsActive = true;
        if (obj.onDays.length === 1) {
          if (obj.onDays[0] === 0) msPerWeek = stringToMS(obj.targetTime);
          else msPerWeek = stringToMS(obj.targetTime) * 7;
        }
        else {
          let numberOfDays = obj.onDays.reduce((accumulator, currentValue) => accumulator + currentValue);
          msPerWeek = stringToMS(obj.targetTime) * numberOfDays;
        }
        totalHobbyTime += msPerWeek;
      }
      return (604800000 - totalHobbyTime);
    }
    let targetTime = findTargetTime();
    targetTime = msToString(targetTime);

    let stateCopy = Object.assign({}, state)
    let index = stateCopy.hobbies.findIndex(hobby => {
      return hobby.name === "Break";
    })

    stateCopy.hobbies[index].targetTime = targetTime;
    stateCopy.hobbies[index].isActive = !aHobbyIsActive;

    return stateCopy;
  }