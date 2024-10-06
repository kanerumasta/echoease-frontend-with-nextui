import { useLogout } from "@/hooks/auth"
import { useChangePasswordMutation } from "@/redux/features/accountApiSlice"
import { passwordSchema } from "@/schemas/auth-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Checkbox } from "@nextui-org/checkbox"
import { Input } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaSave } from "react-icons/fa"
import { MdCancel } from "react-icons/md"
import { toast } from "react-toastify"
import { z } from "zod"

export const ChangePassword = () => {
    const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure()
    const {handleSubmit, reset, register, formState:{errors}} = useForm<z.infer<typeof ChangePasswordSchema>>({resolver:zodResolver(ChangePasswordSchema)})
    const {logout} = useLogout()

    const [changePassword,{isSuccess, isError}] = useChangePasswordMutation()

    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (data:z.infer<typeof ChangePasswordSchema>) => {
        const payload = {
            old_password : data.old_password,
            new_password : data.new_password
        }
        console.log(payload)
        await changePassword(payload).unwrap()
        setTimeout(()=>{
            logout()

        },3000)
        reset()
        onClose()
    }

    useEffect(()=>{
        if(isSuccess){
            toast.success("Password changed successfully.You need to login again.")
        }
        if(isError){
            toast.error("Password is incorrect.")
        }
    },[isSuccess, isError])

    return <>
    <Button onPress={onOpen} radius="sm" color="primary">Change Password</Button>
    <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader>Change Password</ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2">
                        <input style={{display:"none"}}/>
                        <Input type={showPassword ? "text" :'password'} {...register("old_password")} size="lg" label="Old Password" placeholder="Please enter your old password."/>
                        <Input type={showPassword ? "text" :'password'} errorMessage={errors.new_password?.message} isInvalid={!!errors.new_password} {...register("new_password")} size="lg" label="New Password" placeholder="Please enter your new password."/>
                        <Input type={showPassword ? "text" :'password'} errorMessage={errors.confirm_password?.message} isInvalid={!!errors.confirm_password} {...register("confirm_password")} size="lg" label="Confirm Password" placeholder="Please confirm your new password."/>
                        <Checkbox isSelected={showPassword} onValueChange={setShowPassword} aria-label="show">Show Passwords</Checkbox>
                    </div>
                    <div className="flex items-center justify-end my-4 gap-2">
                        <Button radius="sm" type="button" onPress={onClose} startContent={<MdCancel />}>Cancel</Button>
                        <Button radius="sm" type="submit" color="primary" startContent={<FaSave />}>Save</Button>
                    </div>
                </form>
            </ModalBody>
        </ModalContent>
    </Modal>

    </>
}


const ChangePasswordSchema = z.object({
    old_password:z.string(),
    new_password:passwordSchema,
    confirm_password : z.string()
}).refine((values) => values.new_password === values.confirm_password, {
message: "Passwords should match.",
path: ["confirm_password"],
}).refine((values)=> values.old_password !== values.new_password,{
    message:'New password should not be the same as your old password',
    path:['new_password']
})
