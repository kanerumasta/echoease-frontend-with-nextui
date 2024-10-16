'use client'

import { useCreateUnavailableDateMutation } from "@/redux/features/scheduleApiSlice"
import { Button } from "@nextui-org/button"
import { IoClose } from "react-icons/io5"

type Props = {
    date: Date
}

export const SetDateUnavailable = ({ date }: Props) => {
    const [createUnavailableDate,{isLoading}] = useCreateUnavailableDateMutation()

    const handleCreate = () => {
        const formattedDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        const payload = {
            date:formattedDate
        }
        createUnavailableDate(payload)
    }
    return <>
        <Button variant="light" color="danger" radius="full" size="lg" onPress={handleCreate} isLoading={isLoading}>Set Unavailable</Button>
    </>
}
