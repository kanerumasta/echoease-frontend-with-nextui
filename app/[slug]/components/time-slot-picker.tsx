
import { useFetchArtistAvailabilitiesQuery } from "@/redux/features/scheduleApiSlice"
import { BookingSchema, TimeSlotSchema } from "@/schemas/booking-schemas"
import { formatTimeStringTo12Hour } from "@/utils/format-time"
import { Time,parseTime } from "@internationalized/date"
import { Button } from "@nextui-org/button"
import { TimeInput, TimeInputValue } from "@nextui-org/date-input"
import { useDisclosure } from "@nextui-org/modal"
import { Tooltip } from "@nextui-org/tooltip"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import { z } from "zod"

type Props = {
    artist: number,
    date: Date,
}

export const TimeSlotPicker:React.FC<Props> = ({artist, date}) => {
    const {isOpen , onOpen, onClose, onOpenChange} = useDisclosure()
    const {setValue, watch,formState:{errors}} = useFormContext<z.infer<typeof BookingSchema>>()
    const [allowedStartTime, setAllowedStartTime] = useState<Time|null>(null)
    const [allowedEndTime, setAllowedEndTime] = useState<Time|null>(null)
    const selectedTimeSlot = watch("time_slot")
    const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    const {data:time_slots=[]} = useFetchArtistAvailabilitiesQuery({artist:artist, date:dateString})

        // Helper function to convert "HH:mm:ss" string to Time object
    const convertToTime = (timeString: string): Time => {
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        return new Time(hours, minutes, seconds);
    };

    useEffect(()=>{
        if(selectedTimeSlot){
            const startTime = convertToTime(selectedTimeSlot.start_time)
            const endTime = convertToTime(selectedTimeSlot.end_time)
            setAllowedStartTime(startTime)
            setAllowedEndTime(endTime)
        }
    },[selectedTimeSlot])

    const handleStartTimeChange = (timeValue: TimeInputValue) => {
        // const time = convertToTime(timeValue.toString());
        const time = parseTime(timeValue.toString())
        if (time && allowedStartTime && allowedStartTime.compare(time) <= 0) {
            setValue("startTime", time);
        }
    };

    const handleEndTimeChange = (timeValue: TimeInputValue) => {
        const time = parseTime(timeValue.toString())
        if (time && allowedEndTime && allowedEndTime.compare(time) >= 0) {
            setValue("endTime", time);
        }
    };

    return <>
    <div className="p-4 rounded-lg ">
        <h1 className="mb-4 text-center text-xl">Available Time Slot</h1>
         <div className="5 flex flex-wrap mb-8 justify-center gap-4">

            {time_slots.map((timeSlot, index)=>(
                <TimeSlotItem key={index} time_slot={timeSlot} />
            ))}
         </div>
         {allowedStartTime && allowedEndTime &&
         <div className="flex gap-4" >
            <TimeInput value={watch('startTime')} onChange={handleStartTimeChange}  variant="bordered" size="lg" radius="sm" labelPlacement="outside-left" label={"Start Time"} minValue={allowedStartTime} maxValue={allowedEndTime}   />
            <TimeInput value={watch('endTime')} onChange={handleEndTimeChange} variant="bordered" size="lg" radius="sm" labelPlacement="outside-left" label={"End Time"} minValue={allowedStartTime} maxValue={allowedEndTime} />
         </div>
}
</div>
    </>

}


type TimeSlotItemProps = {
    time_slot : z.infer<typeof TimeSlotSchema>,
}
const TimeSlotItem:React.FC<TimeSlotItemProps> = ({time_slot}) => {
    const {watch, setValue } = useFormContext<z.infer<typeof BookingSchema>>()
    const selectedTimeSlot =  watch('time_slot')
    const handleClick = () => {
       setValue('time_slot', time_slot)
    }
    return<>
        {!time_slot.is_booked ?

     <Button onClick={handleClick} variant={selectedTimeSlot?.start_time === time_slot.start_time ? 'solid' :'flat'} className="text-white min-w-[200px]" size="lg" radius="full"  color="primary">

        {formatTimeStringTo12Hour(time_slot.start_time)} - {formatTimeStringTo12Hour(time_slot.end_time)}
    </Button> :
    <Tooltip color="danger" content={"Already Booked"}>
        <Button className="hover:cursor-default" size="lg" radius="full" color="danger" >
            {formatTimeStringTo12Hour(time_slot.start_time)} - {formatTimeStringTo12Hour(time_slot.end_time)}
        </Button>
    </Tooltip>}
    </>
}
