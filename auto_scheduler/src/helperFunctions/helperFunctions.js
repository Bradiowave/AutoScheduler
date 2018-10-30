//========== Universal Helpers ==========//

export const stringToMS = (string) => {
    let timeParts = string.split(":");
    return((+timeParts[0] * (1000 * 60 * 60)) + (+timeParts[1] * 1000 * 60) + (+timeParts[2] * 1000));
  }
  
export const msToString = (duration) => {
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    let hours = parseInt((duration / (1000 * 60 * 60)));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

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