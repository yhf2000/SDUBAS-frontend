import moment from "moment";

export function convertTimestamp(timestamp:number){
    timestamp = Number(timestamp);
    const date = new Date(timestamp);
    return moment(date).format('YYYY-MM-DD');
}