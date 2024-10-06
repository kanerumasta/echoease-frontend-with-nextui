import { EditIcon } from "@/components/icons/edit"
import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { getLocalTimeZone, today } from "@internationalized/date"
import { Button } from "@nextui-org/button"
import { DatePicker } from "@nextui-org/date-picker"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

export const ChangeDob = () => {
    const {handleSubmit, reset, setValue,formState:{errors}} = useForm<z.infer<typeof DobSchema>>({resolver:zodResolver(DobSchema)})
    const [updateProfile,{isSuccess, isError}] = useUpdateProfileMutation()


    const {onClose, onOpen, onOpenChange, isOpen} = useDisclosure()
    const onSubmit = async (data:z.infer<typeof DobSchema>) => {
        const dateString = `${data.dob.getFullYear()}-${data.dob.getMonth()+1}-${data.dob.getDate()}`
        const payload = {
            dob:dateString
        }
        await updateProfile(payload)
        reset()
        onClose()

    }

    useEffect(()=>{
        if(isSuccess){
            toast.success("Your birthdate is changed!")
        }
        if(isError){
            toast.error("Failed updating your birthdate")
        }
    },[isSuccess, isError])
    return (
        <>
        <EditIcon onClick={onOpen}/>
        <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Edit you Birthdate</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <DatePicker aria-label="date input" isInvalid={!!errors.dob} errorMessage={errors.dob?.message} size="lg" radius="sm" onChange={(e)=>setValue('dob',e?.toDate(getLocalTimeZone()))} showMonthAndYearPickers maxValue={today(getLocalTimeZone()).subtract({ years: 18 })}/>
                        </div>
                        <div className="flex items-center gap-2 justify-end my-4">
                            <Button type="button" onPress={()=>{reset();onClose()}}>Cancel</Button>
                            <Button type="submit" radius="sm" color="primary">Save</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

// Get today's date and the date 2 years ago
const todayDate = new Date();
const twoYearsAgo = new Date();
twoYearsAgo.setFullYear(todayDate.getFullYear() - 18);
const hundredYearsAgo = new Date();
hundredYearsAgo.setFullYear(todayDate.getFullYear() - 100);

const DobSchema = z.object({
    dob: z.date().refine((date) => {
      // Ensure birthdate is not in the future
      return date <= todayDate;
    }, {
      message: "Birthdate cannot be a future date."
    }).refine((date) => {
      // Ensure birthdate is at least 2 years ago
      return date <= twoYearsAgo;
    }, {
      message: "You must be at least 18 years old"
    }).refine(date=>{
        return date > hundredYearsAgo
    },{message:'Birthdate should be younger than 100 years old'}),
  });
