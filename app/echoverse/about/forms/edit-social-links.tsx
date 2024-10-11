'use client'

import { EditIcon } from "@/components/icons/edit"
import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice"
import { useUpdateArtistMutation } from "@/redux/features/artistApiSlice"
import { ArtistInSchema } from "@/schemas/artist-schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useForm } from "react-hook-form"
import { FaFacebook, FaInstagram, FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa"
import { z } from "zod"

const SocialSchema = z.object({
    fb_link : z.string(),
    instagram: z.string(),
    youtube:z.string(),
    spotify:z.string(),
    twitter:z.string()
})

export const EditSocialLinks = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {
    const {register, handleSubmit,reset} = useForm<z.infer<typeof SocialSchema>>({resolver:zodResolver(SocialSchema)})
    const [updateArtist,{isLoading}] = useUpdateArtistMutation()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const onSubmit = async (data:z.infer<typeof SocialSchema>) => {
        const formData = new FormData()
        data.fb_link && formData.append("fb_link", data.fb_link)
        data.youtube && formData.append("youtube", data.youtube)
        data.instagram && formData.append("instagram", data.instagram)
        data.twitter && formData.append("twitter", data.twitter)
        data.spotify && formData.append("spotify", data.spotify)
        formData.append("artist_id",artist.id.toString())

        await updateArtist(formData)
        reset()
        onClose()

    }
    return <>
        <Button className="absolute top-2 right-2" radius="full" variant="flat" isIconOnly onPress={onOpen}>
            <EditIcon className="text-lg" />
        </Button>
        <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Edit Links</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Input isClearable startContent={<FaFacebook />} defaultValue={artist.fb_link || ''} label={"Facebook Profile"} {...register('fb_link')}/>
                            <Input isClearable startContent={<FaYoutube />} defaultValue={artist.youtube || ''} label={"Youtube"} {...register('youtube')}/>
                            <Input isClearable startContent={<FaSpotify />} defaultValue={artist.spotify || ''} label={"Spotify"} {...register('spotify')}/>
                            <Input isClearable startContent={<FaInstagram />} defaultValue={artist.instagram || ''} label={"Instagram"} {...register('instagram')}/>
                            <Input isClearable startContent={<FaTwitter />} defaultValue={artist.twitter || ''} label={"Twitter"} {...register('twitter')}/>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button type="button" onPress={onClose}>Cancel</Button>
                            <Button type="submit" isLoading={isLoading} isDisabled={isLoading} className="bg-blue-500">Update</Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
}
