export const time_number_minute = (time:string)=>{
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}