'use client'

import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Select, SelectItem } from "@nextui-org/select"
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react"
import { MdUpload } from "react-icons/md"
import { DisputeReasonOptions } from "../utils"
import { useAddDisputeEvidenceMutation, useCreateDisputeMutation } from "@/redux/features/disputeApiSlice"
import { z } from "zod"
import { BookInSchema } from "@/schemas/booking-schemas"
import { cn, truncateString } from "@/lib/utils"
import { toast } from "react-toastify"
import DisputeSubmittedModal from "./dispute-submitted-modal"
import DisputeIcon from "@/components/icons/dispute"

type CreateDisputeProps = {
    booking:z.infer<typeof BookInSchema>,
    clientId:number
}

export const CreateDispute:React.FC<CreateDisputeProps> =({booking, clientId})=>{
    const [evidenceFiles, setEvidenceFiles] = useState<File[]>([])
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const [disputeReason , setDisputeReason] = useState("")
    const [disputeDescription, setDisputeDescription] = useState('')
    const [createDispute,{isLoading}] = useCreateDisputeMutation()
    const [addDisputeEvidence] = useAddDisputeEvidenceMutation()
    const [disputeSubmitted, setDisputeSubmitted] = useState(false)

    const SubmitDispute = async ()=>{
        if (disputeReason.length <= 0){
            toast.error('Please choose dispute reason.')
            return
        }
        if(disputeDescription.length <= 0){
            toast.error('Please provide a description.')
            return
        }
        const disputePayload = {
            dispute_type:'client',
            booking: booking.id,
            client: clientId,
            reason: disputeReason,
            description: disputeDescription
        }

        const responseData = await createDispute(disputePayload).unwrap()



        if(responseData){
            console.log(responseData)
            const disputeId = responseData.id
            setDisputeSubmitted(true)


            evidenceFiles.forEach(file=>{
                const formData = new FormData()
                formData.append('dispute', disputeId)
                formData.append('file', file)
                if(file.name.toLowerCase().endsWith('.mp4')){
                    formData.append('media_type', 'video')
                }else{
                    formData.append('media_type', 'image')
                }
                addDisputeEvidence(formData)
            })
        }

    }

    const cleanUp = () => {
        setDisputeDescription('')
        setDisputeReason('')
        setEvidenceFiles([])
        setDisputeSubmitted(false)
        onClose()
    }

    return <>
    <Button startContent={<DisputeIcon />} onPress={onOpen} className="" variant="bordered" color="danger" radius="sm" size="md">Report a Dispute</Button>
    <Modal classNames={{base:'border-[1px] border-[#f31260]/50'}} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <ModalHeader>
                <div className="">
                <p className="text-xl">Report a Dispute</p>
                <p className="text-xs text-white/50">Help us understand your issue so we can assist you better.</p>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className="space-y-2">

                    <Input radius="sm" label="Booking" value={booking.booking_reference}/>
                    <Select label="Select the reason for your dispute." radius="sm" size="lg" onChange={e=>setDisputeReason(e.target.value)}>
                        {DisputeReasonOptions.map((reason)=>(
                            <SelectItem key={reason.id}>{reason.label}</SelectItem>
                        ))}
                    </Select>
                    <Textarea radius="sm" onChange={(e)=>setDisputeDescription(e.target.value)} label="Description"/>
                    <div>
                        <p className="mt-4 mb-2 text-white/70">Attach files to support your dispute. </p>
                    <FilesPicker selectedFiles={evidenceFiles} setSelectedFiles={setEvidenceFiles}/>
                    </div>
                    <div className="flex pt-4 justify-end gap-2">
                        <Button radius="sm" onPress={onClose}>Cancel</Button>
                        <Button isLoading={isLoading} className="bg-[#f31260]" radius="sm" onPress={SubmitDispute}>Submit</Button>
                    </div>

                </div>
            </ModalBody>
        </ModalContent>
    </Modal>
    <DisputeSubmittedModal isOpen={disputeSubmitted} onClose={cleanUp}/>

    </>
}

type FilesPickerProps = {
    selectedFiles : File[],
    setSelectedFiles:Dispatch<SetStateAction<File[]>>
}
const FilesPicker:React.FC<FilesPickerProps> = ({selectedFiles, setSelectedFiles} ) => {
    const MAX_FILE_SIZE = 150 * 1024 * 1024
    const inputRef = useRef<HTMLInputElement|null>(null)
    const handleDivClick = () => {
        if(inputRef.current){
            inputRef.current.click()
        }
    }

    const onInputChange =(event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            const sizeArray = Array.from(event.target.files).map(file=>file.size)
            const sum = sizeArray.reduce((acc, curValue)=>acc + curValue,0)
            if(sum > MAX_FILE_SIZE){
                toast.error(`Selected files exceed the 150MB  maximum file size limit.`)
                return
            }
            setSelectedFiles(Array.from(event.target.files))
        }

    }

    return <div>
        <input onChange={onInputChange} style={{display:'none'}} type="file" accept="image/*, video/*" multiple ref={inputRef}/>
        <div onClick={handleDivClick} className={cn("w-full cursor-pointer hover:bg-blue-500/10 h-[200px] rounded-lg border-2 border-dashed border-blue-500 flex items-center justify-center")}>
            {selectedFiles &&

                <div className="space-y-2">{selectedFiles.map(file=>(
                    <p className="bg-blue-500 p-2 rounded-md">{truncateString(file.name, 20)}</p>
                ))}</div>
            }
            <div className="flex flex-col items-center">
            {selectedFiles.length <= 0 &&
            <>
            <MdUpload size={60} className="text-blue-500"/>
            <p className="text-white/50">Upload Here.</p>
            </>
            }

            </div>
        </div>
    </div>
}
