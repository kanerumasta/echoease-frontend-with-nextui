'use client'

import CustomImage from "@/components/image"
import { useAddNewPortfolioItemMediaMutation, useCreateNewPortfolioItemMutation } from "@/redux/features/artistApiSlice"
import { ArtistInSchema } from "@/schemas/artist-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Input, Textarea } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { FaSave, FaUpload } from "react-icons/fa"
import { ImUpload } from "react-icons/im"
import { IoMdPlay } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import { MdCancel } from "react-icons/md"
import { toast } from "react-toastify"
import {Progress} from '@nextui-org/progress'
import { z } from "zod"



type Props = {
    artist:z.infer<typeof ArtistInSchema>
}
export const CreatePortofolioItem = ({artist}:Props) => {
    const {isOpen, onOpenChange, onClose, onOpen} = useDisclosure()
    const [createNewPortfolioItem,{isSuccess, isError}] = useCreateNewPortfolioItemMutation()
    const [addNewPortfolioItemMedia] = useAddNewPortfolioItemMediaMutation()
    const {handleSubmit, register,reset, formState:{errors}} = useForm<z.infer<typeof CreatePorfolioItemSchema>>({resolver:zodResolver(CreatePorfolioItemSchema)})
    const [uploadProgress, setUploadProgress] = useState(0)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const onSubmit = async (data:z.infer<typeof CreatePorfolioItemSchema>) => {
        if(selectedFiles.length <= 0){
            toast.error("Select at least one video or image.")
            return
        }
        if(!artist.portfolio){
            toast.error('Please try again.')
            return
        }

        const formData = new FormData()
        artist.portfolio && formData.append("portfolio", artist.portfolio.toString())
        formData.append('title', data.title)
        data.description && formData.append('description', data.description)

        const response = await createNewPortfolioItem(formData)
        const portfolioId = response.data.id
        let desiredProgress = 0
        setUploadProgress(1) //trigger show progress bar


        for(let i = 0; i < selectedFiles.length; i++){
            const file = selectedFiles[i]
            const formData = new FormData()
            const type = file.name.endsWith('.mp4') ? 'video' : 'image'
            formData.append("media_type",type)
            formData.append("file", file)
            formData.append("portfolio_item", portfolioId)
            await addNewPortfolioItemMedia(formData).unwrap()
            desiredProgress = Math.round(((i + 1) / selectedFiles.length) * 100);

            // Increment the progress towards the desired progress smoothly
            incrementProgress(desiredProgress);
        }

        handleUploadSuccess()
    }
    const incrementProgress = (desiredProgress: number) => {
        const step = 1;
        const interval = 30; // Time in ms between each increment



        const intervalId = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev < desiredProgress) {
                    return prev + step; // Increment progress
                } else {
                    clearInterval(intervalId); // Stop incrementing when reached the desired progress
                    return prev;
                }
            });
        }, interval);
    };

    const handleModalOpenChange = () => {
        reset();
        setUploadProgress(0); // Reset the progress here
        setSelectedFiles([]);
        onOpenChange();
    };
    const handleUploadSuccess = () => {
        setUploadProgress(0)
        reset()
        setSelectedFiles([])
        onClose()
        toast.success("Portfolio uploaded successfully!")
    }
    const handleClose = () => {
        reset();onOpenChange();
        setSelectedFiles([])
        onClose()
    }



    return <>
        <Button color="primary" radius="sm" size="lg" onPress={onOpen}>Add Portfolio</Button>
        <Modal isDismissable={false} isOpen={isOpen} onOpenChange={handleModalOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Add New Portfolio

                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-3">
                        <Input variant="faded" isInvalid={!!errors.title} errorMessage={errors.title?.message} {...register('title')} isRequired label="Title" placeholder="E.g. Live Performances"/>
                        <Textarea variant="faded" isInvalid={!!errors.description} errorMessage={errors.description?.message} {...register('description')} label="Description" placeholder="You can type a portfolio description here..."/>
                        <FilesPicker selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}/>
                        <div className="flex items-center justify-end">
                            <Button radius="sm" onPress={handleClose} type="button" startContent={<MdCancel />}>Cancel</Button>
                            <Button isDisabled={uploadProgress > 0} radius="sm" type="submit" startContent={<FaSave />} color="primary">Create</Button>
                        </div>
                    </div>
                    </form>
                    {uploadProgress >= 1 &&
                    <Progress
                        label="Uploading..."
                        aria-label="Uploading..."
                        size="lg"
                        value={uploadProgress}
                        color="primary"
                        showValueLabel={true}
                        className=""
                        />
                    }
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}



const CreatePorfolioItemSchema = z.object({
    title:z.string().min(1,'A portfolio title is required.'),
    description:z.string().nullable(),
})


type FilePickerProps = {
    selectedFiles : File[],
    setSelectedFiles : Dispatch<SetStateAction<File[]>>
}
const FilesPicker = ({selectedFiles, setSelectedFiles}:FilePickerProps) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const newFiles = Array.from(e.target.files)
            const currentImages = selectedFiles.filter((file)=>!file.name.endsWith('.mp4'))
            const currentVideos = selectedFiles.filter((file)=>file.name.endsWith('.mp4'))

            const newSelectedVideos = newFiles.filter((file)=>file.name.endsWith('.mp4'))
            const newSelectedImages = newFiles.filter((file)=>!file.name.endsWith('.mp4'))

            // Combine images, filter out duplicates (based on file name)
            const combinedImages = [...currentImages, ...newSelectedImages].filter(
                (image, index, self) => index === self.findIndex((i) => i.name === image.name)
            )
            // Combine videos, filter out duplicates (based on file name)
            const combinedVideos = [...currentVideos, ...newSelectedVideos].filter(
                (video, index, self) => index === self.findIndex((v) => v.name === video.name)
            )
            const LIMIT_VIDEOS = 2
            const LIMIT_IMAGES = 5
            if(combinedVideos.length > LIMIT_VIDEOS){
                toast.error("You can only add up to 2 videos for a portfolio")
                return
            }
            if(combinedImages.length > LIMIT_IMAGES){
                toast.error("You can only add up to 5 images for a portfolio")
                return
            }
            setSelectedFiles([ ...combinedImages,...combinedVideos])

            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    }

    const handleDivClick = () => {
        if(inputRef.current){
            inputRef.current.click()
        }
    }

    const handleRemoveFile =(fileToRemove:File) => {
        setSelectedFiles((prevFiles)=>prevFiles.filter((prevFile)=>prevFile !== fileToRemove))
    }

    return <>
        <input onChange={handleFileChange} ref={inputRef} type="file" style={{display:"none"}} multiple accept="image/png,image/jpeg,image/jpg,video/mp4"/>
        <div onClick={handleDivClick} className="border-2 items-center justify-center hover:cursor-pointer hover:bg-black/40 rounded-2xl duration-200 transition-all ease-in-out p-4 flex flex-wrap gap-4 border-blue-500 border-dashed  min-h-[260px]">
            {selectedFiles.length > 0 ? selectedFiles.map((file,index)=>(
                file.name.endsWith('.mp4') ?
                <div key={index} className="relative bg-white/15 ">
                    <div  className= "w-[100px] h-[100px] overflow-hidden">
                        <video className="w-full h-full object-cover">
                            <source src={URL.createObjectURL(file)}/>
                        </video>
                        <IoClose  onClick={(e)=>{e.stopPropagation(); handleRemoveFile(file)}} size={24} className="hover:text-red-500 absolute -top-2 -right-2"/>
                        <IoMdPlay className="absolute top-[50%] text-blue-600 left-[50%] -translate-x-[50%] -translate-y-[50%]" size={30}/>
                     </div>
                </div> :
                <div key={index} className=" relative">
                    <CustomImage  width="100px" height="100px" src={URL.createObjectURL(file)}/>
                    <IoClose onClick={(e)=>{e.stopPropagation();handleRemoveFile(file)}}  className="absolute hover:text-red-500 -top-2 -right-2" size={24}/>
                </div>
            )) :
            <div className=" flex flex-col items-center space-y-2">
            <FaUpload size={40} className="text-blue-500"/>
            <p className="text-xl">Upload Here</p>
            </div>}
        </div>

    </>
}
