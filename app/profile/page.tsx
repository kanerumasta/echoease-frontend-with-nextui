'use client'
import { EditIcon } from "@/components/icons/edit"
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice"
import { UserSchema } from "@/schemas/user-schemas"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { BsGenderFemale, BsGenderMale } from "react-icons/bs"
import { FaPhone, FaSave } from "react-icons/fa"
import { ImLocation } from "react-icons/im"
import { IoPerson } from "react-icons/io5"
import { LiaBirthdayCakeSolid } from "react-icons/lia"
import { MdCancel, MdEmail } from "react-icons/md"
import { z } from "zod"
import ChangeProfileImage from "./forms/change-profile-image"
import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { ChangeName } from "./forms/change-name"
import { cn } from "@/lib/utils"
import { ChangeAddress } from "./forms/change-address"
import { ChangePhone } from "./forms/change-phone"
import { ChangeDob } from "./forms/change-dob"
import { ChangeGender } from "./forms/change-gender"
import { ChangePassword } from "./forms/change-password"
import { Spacer } from "@nextui-org/spacer"

export default function ProfilePage(){
    const {data:currentUser, isLoading} = useFetchCurrentUserQuery()
    const {onOpen,isOpen, onOpenChange} = useDisclosure()


    return (
        <>
        <div className="w-full md:px-[100px] ">
            <div className="flex mb-20 relative gap-2 bg-white/10 h-[200px] rounded-lg md:justify-start p-4 justify-center">
                <h1 className="text-4xl  w-full font-black tracking-wide text-white/25">PROFILE</h1>
                <div className=" absolute bottom-2 right-2 gap-2 flex items-center">
                <Button radius="sm" variant="ghost" className="text-white" color="danger">Deactivate</Button>
               <ChangePassword />
                </div>


               {currentUser  && <ChangeProfileImage  currentUser={currentUser}/>}
            </div>
        <Spacer y={40}/>
<div className="w-full">


           {currentUser && <PersonalInfo user={currentUser}/>}

           </div>
     </div>

     </>
    )
}


type PersonalInfoProps = {
user:z.infer<typeof UserSchema>
}
const PersonalInfo = ({user}:PersonalInfoProps) => {
    const {isOpen, onOpenChange, onOpen, onClose} = useDisclosure()
    const Line = ({title, value, icon,isEditable, valueClassName }:{title:string, value:string, icon:any, isEditable?:boolean, valueClassName?:string}) => {
        return (
            <div className="flex px-1 items-center justify-between text-white/80">
            <div className="flex items-center gap-2">
            {icon}
            <p className="flex tracking-wide items-center gap-2 font-bold"> {title}:<span className={cn("md:text-lg tracking-wide font-normal",valueClassName)}>{value}</span></p>
            </div>
{isEditable &&  <EditIcon />}
        </div>
        )
    }

    return <div className="p-4 rounded-md w-full  bg-white/10 min-h-[300px]">
        <p className="text-sm text-white/20 mb-3">Personal Details</p>
        {user.profile &&
        <div className="space-y-3 capitalize">
            <div className="flex items-center justify-between">
                <Line title="Name" value={user.fullname} icon={<IoPerson color="#757777"/>}/>
              <ChangeName user={user}/>

            </div>
            <Line valueClassName="lowercase" title="Email" value={user.email.toLowerCase()} icon={<MdEmail color="#757777"/>}/>
            <div className="flex items-center justify-between">
             <Line title="Address" value={user.profile?.complete_address} icon={<ImLocation color="#757777"/>}/>
             <ChangeAddress />
            </div>
            <div className="flex items-center justify-between">
            <Line title="Phone Number" value={user.profile.phone} icon={<FaPhone color="#757777"/>}/>
            <ChangePhone />
            </div>
            <div className="flex items-center justify-between">
                <Line title="Date of Birth" value={user.profile.dob} icon={<LiaBirthdayCakeSolid  color="#757777"/>}/>
                <ChangeDob />
            </div>
            <div className="flex items-center justify-between">

            <Line title="Gender" value={user.profile.gender} icon={user.profile.gender === 'male' ? <BsGenderMale  color="#757777"/> :<BsGenderFemale  color="#757777"/>}/>
            <ChangeGender user={user}/>
            </div>
        </div>
}
    </div>
}
