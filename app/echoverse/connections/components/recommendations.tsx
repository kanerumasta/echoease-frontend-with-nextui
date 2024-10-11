'use client'

import { useConnectArtistMutation, useFetchDetailCurrentArtistQuery, useFetchRecommendedArtistConnectionsQuery } from "@/redux/features/artistApiSlice"
import { RecommendedArtistsConnectionsSchema } from "@/schemas/artist-schemas"
import { Button } from "@nextui-org/button"
import { Chip } from "@nextui-org/chip"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { User } from "@nextui-org/user"
import { useRouter } from "next/navigation"
import { z } from "zod"


export const Recommendations = () => {
    const {data:recommendedArtists,isLoading} = useFetchRecommendedArtistConnectionsQuery()
    const {data:currentArtist} = useFetchDetailCurrentArtistQuery()


    return <div className="flex flex-col max-h-[300px] min-h-[300px] border-[1px] border-white/30 bg-black/40 rounded-md overflow-y-scroll scrollbar-hide">
        {recommendedArtists && currentArtist &&
            recommendedArtists.map((artist)=>(
                <ListItem currentArtistId={currentArtist.id} artist={artist}/>
            ))
        }


    </div>

}

const ListItem = ({artist, currentArtistId}:{artist:z.infer<typeof RecommendedArtistsConnectionsSchema>, currentArtistId:number}) => {
    const [connectArtist, {isLoading}] = useConnectArtistMutation()
    const connect = () => {
        const payload = {
            sender:currentArtistId.toString(),
            receiver : artist.id
        }

        connectArtist(payload)
    }
    const router = useRouter()
return (
    <div className="flex px-2  transition-all duration-100 ease-in-out items-center justify-between">
                <User classNames={{base:'justify-start px-4 py-2',name:'capitalize text-lg ', description:'text-white/50'}} name={<p onClick={()=>router.push(`/${artist.slug}`)} className="hover:text-blue-500 hover:cursor-pointer transition-all duration-150 ease-in-out">{artist.user.fullname}</p>} description={<DescriptionMarkUp artist={artist}/>} avatarProps={{size:"lg",src:`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}}/>
                <div className="flex">
                    <Button onPress={connect} isLoading={isLoading} className="bg-blue-500" isDisabled={isLoading} radius="sm">Connect</Button>
                </div>
    </div>
)

}

const DescriptionMarkUp = ({artist}:{artist:z.infer<typeof RecommendedArtistsConnectionsSchema>}) => {
    const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure()
    return (
        <>
        <div>
            {artist.mutual.length > 0 &&
                <Chip onClick={onOpen} variant="solid" className="text-white hover:cursor-pointer hover:opacity-80" color="secondary" size="sm">{`Mutual: ${artist.mutual.length}`}</Chip>
            }
            <div className="flex">
                {artist.genres.map((genre)=><span className="text-xs mr-1">#{genre.name}</span>)}
            </div>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Mutual Connections</ModalHeader>
                <ModalBody>
                    <div className="max-h-[400px] min-h-[300px] scrollbar-hide overflow-y-scroll mb-10 rounded-lg">
                        {artist.mutual.map((m)=>(
                            <User classNames={{base:'px-4 py-2 '}} name={m.user.fullname} description={"Echoee"} avatarProps={{src:`${process.env.NEXT_PUBLIC_HOST}${m.user.profile?.profile_image}`}}/>
                        ))}
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}
