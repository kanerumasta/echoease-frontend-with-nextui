import { Time } from "@internationalized/date";

export function formatTimeTo12Hour(time: Time) {
    const hour = time.hour > 12 ? time.hour - 12 : time.hour
    const minutes = time.minute
    const meridiem = time.hour > 12 ? 'PM' : 'AM'

    return `${hour}:${minutes} ${meridiem}`
  }
