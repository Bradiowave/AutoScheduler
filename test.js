hobby = {
    name: '',
    progress: '00:00:00',
    targetTime: '01:00:00',
    resetEvery: '24:00:00',
    onDays: [1,1,1,1,1,1,1],
    addsToBreak: true,
    isActive: false,
    autoComplete: false,
}

breakTime = {
    progress: '00:00:00',
    targetTime: '00:00:00',
    toUse: '00:00:00',
    resetEvery: '00:00:00',
}

function getMillisecondsToMonday(){
    let now = new Date();
    let offsetDays = ( ( ( 7 - now.getDay() ) % 7 ) + 1 );

    let nextMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate()+offsetDays);

    return nextMonday - now;
};

function convertMiliseconds(miliseconds, format) {
    var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));

    seconds = parseInt(total_seconds % 60);
    minutes = parseInt(total_minutes % 60);
    hours = parseInt(total_hours % 24);

    switch(format) {
        case 's':
            return total_seconds;
            break;
        case 'm':
            return total_minutes;
            break;
        case 'h':
            return total_hours;
            break;
        case 'd':
            return days;
            break;
        default:
            return { d: days, h: hours, m: minutes, s: seconds };
    }
};
  
let mills = getMillisecondsToMonday();

console.log(convertMiliseconds(mills));