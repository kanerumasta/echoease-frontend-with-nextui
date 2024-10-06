import { cn } from "@/lib/utils"
import { useFetchAllTimeSlotsQuery, useFetchTimeSlotsQuery } from "@/redux/features/artistApiSlice"
import { ArtistInSchema, TimeslotSchema } from "@/schemas/artist-schemas"
import { Skeleton } from "@nextui-org/skeleton"
import { Dispatch, SetStateAction, useMemo } from "react"
import { z } from "zod"

type TimeSlotProps = {
    selectedSlot:z.infer<typeof TimeslotSchema> | null,
    setSelectedSlot:Dispatch<SetStateAction<z.infer<typeof TimeslotSchema>|null>>,
    artist:z.infer<typeof ArtistInSchema>,
    date:Date
}
export const TimeSlotPicker = ({selectedSlot, setSelectedSlot,artist,date}:TimeSlotProps) => {
    const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const artistId = artist.id.toString()
    const {data:allTimeSlots} = useFetchAllTimeSlotsQuery(artist.id.toString())
    const {data:availableTimeSlots, isLoading:availableTimeSlotsLoading, isError:availableTimeSlotsError} = useFetchTimeSlotsQuery({artistId:artistId, date:dateString})
    const availableTimeSlotIds = useMemo(() => new Set(availableTimeSlots?.map((slot) => slot.id)), [availableTimeSlots]);

    const handleSlotClick = (slot:z.infer<typeof TimeslotSchema>) =>{
        setSelectedSlot(slot)
    }



    if(availableTimeSlotsLoading){
        return <div className="">
            <h1></h1>
        <div className="space-y-2">
            <Skeleton className="h-20 w-full rounded-lg"/>
            <Skeleton className="h-20 w-full rounded-lg"/>
            <Skeleton className="h-20 w-full rounded-lg"/>
        </div>
        </div>
    }

    return <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
        <h1 className="text-2xl font-bold uppercase mb-8 text-center">Choose From <span className=" text-blue-500 capitalize">{artist.user.first_name}'s</span> Available Time Slots</h1>
        {allTimeSlots?.map((slot)=>(
 <div onClick={()=>availableTimeSlotIds.has(slot.id) && handleSlotClick(slot)} key={slot.id} className={cn("p-4 rounded-lg bg-blue-500/35 my-1 cursor-pointer text-xl",{"bg-gray-400 cursor-default":!availableTimeSlotIds.has(slot.id),"bg-blue-500":selectedSlot?.id === slot.id})}>{slot.start_time} - {slot.end_time}</div>
        ))}


    </div>
}
