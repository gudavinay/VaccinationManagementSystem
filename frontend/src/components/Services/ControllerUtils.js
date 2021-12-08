import moment from 'moment';

export function createTimeSlots(opening, closing, includeExtra) {
    let sm = moment(opening, "HH:mm");
    let em = moment(closing, "HH:mm");
    let tempList = [];
    while (sm < em) {
        tempList.push(new moment(sm).format("HH:mm"));
        sm.add(15, "minutes");
    }
    if(includeExtra){
        tempList.push(new moment(sm).format("HH:mm"));
    }
    return tempList;
}

export function getTimeFromInt(number){
    return new moment(moment(number, "hh:mm A")).format("hh:mm A");
}
