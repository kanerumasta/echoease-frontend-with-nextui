'use client'

import { useDeleteUnavailableDateMutation } from "@/redux/features/scheduleApiSlice"
import { Button } from "@nextui-org/button"
import { toast } from "react-toastify"


//id here is the id of UNAVAILABLEDATE model
export const SetDateAvailable = ({ id}:{ id:number|null}) => {
    const [deleteUnavailableDate,{isLoading}] = useDeleteUnavailableDateMutation()
    const handleSetAvailable = () => {
        alert(id)
        if(id)
            deleteUnavailableDate(id)
        else
            toast.error('Cant find date ID')
    }
    return <>
        <Button onPress={handleSetAvailable} isLoading={isLoading}>Set Available</Button>
    </>
}
