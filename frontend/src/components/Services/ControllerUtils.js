import moment from 'moment';
const timeFormat = "hh:mm A";

export function createTimeSlots(date, opening, closing, includeExtra) {
    var todayDate=new Date().toISOString().split('T')[0].toString();
    if(date===todayDate){
        opening=new Date().getHours();
    }
    console.log(opening);
    console.log(closing);
    let sm = moment(opening, timeFormat);
    let em = moment(closing, timeFormat);
    let tempList = [];
    while (sm < em) {
        tempList.push(new moment(sm).format(timeFormat));
        sm.add(15, "minutes");
    }
    if(includeExtra){
        tempList.push(new moment(sm).format(timeFormat));
    }
    return tempList;
}

export function getTimeFromInt(number){
    return new moment(moment(number, timeFormat)).format(timeFormat);
}

