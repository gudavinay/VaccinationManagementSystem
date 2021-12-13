import moment from 'moment';
const timeFormat = "hh:mm A";

export function createTimeSlots(opening, closing, includeExtra) {
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
