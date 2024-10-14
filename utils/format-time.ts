import { Time } from "@internationalized/date";

export function formatTimeTo12Hour(time: Time) {
    const hour = time.hour % 12 || 12
    const minutes = time.minute
    const meridiem = time.hour > 12 ? 'PM' : 'AM'

    return `${hour}:${minutes} ${meridiem}`
  }

 export  function formatTimeStringTo12Hour(timeString:string) {
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes] = timeString.split(':');

    // Convert hours to a number
    let hourNumber = parseInt(hours, 10);

    // Determine AM/PM suffix
    const suffix = hourNumber >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hourNumber = hourNumber % 12 || 12; // if hour is 0 (midnight), set to 12

    // Format the time in "h:mm A" format
    return `${hourNumber}:${minutes} ${suffix}`;
}
