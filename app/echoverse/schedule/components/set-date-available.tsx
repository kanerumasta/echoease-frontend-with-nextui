'use client'

import { useDeleteUnavailableDateMutation } from "@/redux/features/scheduleApiSlice"
import { Button } from "@nextui-org/button"
import { IoCheckmark } from "react-icons/io5"
import { toast } from "react-toastify"


//id here is the id of UNAVAILABLEDATE model
export const SetDateAvailable = ({id}:{ id:number|null}) => {
    const [deleteUnavailableDate,{isLoading}] = useDeleteUnavailableDateMutation()
    const handleSetAvailable = () => {

        if(id)
            deleteUnavailableDate(id)
        else
            toast.error('Cant find date ID')
    }
    return <>
        <Button color="success" variant="light" radius="full" size="lg" onPress={handleSetAvailable} isLoading={isLoading}>
            Set Available
        </Button>
    </>
}
