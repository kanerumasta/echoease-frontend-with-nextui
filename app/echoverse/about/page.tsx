"use client";

import CustomImage from "@/components/image";
import useIsArtistOnly from "@/hooks/use-is-artist-only";
import useLoginRequired from "@/hooks/use-login-required";
import { useDeleteGenreMutation, useFetchDetailCurrentArtistQuery, useFetchGenresQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema, GenreSchema } from "@/schemas/artist-schemas";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { ChangeEvent, createContext, ReactNode, useContext, useRef, useState } from "react";
import { z } from "zod";
import { AddRate } from "./forms/add-rate";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import { Tooltip } from "@nextui-org/tooltip";
import { EditRate } from "./forms/edit-rate";
import { DeleteRate } from "./forms/delete-rate";
import { Badge } from "@nextui-org/badge";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { MultipleGenresPicker } from "@/components/multiple-genres-picker";
import { AddGenre } from "./forms/add-genre";
import { useUpdateProfileMutation } from "@/redux/features/accountApiSlice";
import { BsThreeDots } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { EditPersonalDetails } from "./forms/edit-name";
import { ChangeName } from "@/app/profile/forms/change-name";
import { ChangeAddress } from "@/app/profile/forms/change-address";
import { ChangeDob } from "@/app/profile/forms/change-dob";
import { ChangeGender } from "@/app/profile/forms/change-gender";
import { ChangePhone } from "@/app/profile/forms/change-phone";
import { EditSocialLinks } from "./forms/edit-social-links";
import { Spacer } from "@nextui-org/spacer";

export default function AboutPage() {
  const {
    data: currentArtist,
    isLoading: isCurrentArtistLoading,
    isError: isCurrentArtistError,
  } = useFetchDetailCurrentArtistQuery();
  const { loginChecked } = useLoginRequired("/echoverse");
  const { isArtist, isLoading: artistLoading } = useIsArtistOnly();

  // login and isArtist checking
  if (!loginChecked || artistLoading) {
      return <div>Loading...</div>;
  }

  if (!artistLoading && !isArtist) {
      return notFound();
  }

  return (
    <div className="">
    {/* {currentArtist && <CustomImage width="150px" height="150px" src={`${process.env.NEXT_PUBLIC_HOST}${currentArtist.user.profile?.profile_image}`}/> } */}
    {currentArtist &&
    <div className="space-y-2">

            <PersonalDetails artist={currentArtist}/>
            <div className="flex w-full gap-2">
            <ArtistDetails artist={currentArtist}/>
            <SocialLinks artist={currentArtist}/>
            </div>

    </div>

    }


    </div>
  );
}




const PersonalDetails = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {

    const [file, setFile] = useState<File|null>(null)
    const inputRef = useRef<HTMLInputElement|null>(null)
    const [updateProfile] = useUpdateProfileMutation()

    const onFileChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.files?.[0]){
            setFile(event.target.files[0])
        }
    }

    const onDivClick = () => {
        if(inputRef.current){
            inputRef.current.click()
        }
    }

    const changeProfileImage = async () => {

        if(file){
            const formData = new FormData()
            formData.append('profile_image', file)
            setFile(null)
            await updateProfile(formData)
            toast.success("Profile updated successfully.")
        }
    }

 return (
    <div className="p-4 gap-4  flex bg-white/5 rounded-md ">
        <input type="file" accept="image/jpeg, image/png, image/jpg" style={{display:"none"}} onChange={onFileChange} ref={inputRef}/>
        <div className="relative group ">
            {file ?
            <CustomImage width="200px" height="200px" src={URL.createObjectURL(file)} />
            :
            <CustomImage width="200px" height="200px" src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`} />}
            <div onClick={onDivClick} className="flex transition-all duration-150 ease-in-out cursor-pointer items-center gap-2 justify-center absolute opacity-0 group-hover:opacity-100 top-0 left-0 w-full h-full bg-black/60">
                <EditIcon className="text-lg"/>
                <span>Change Image</span>
                {file && <div className="flex absolute bottom-2 right-2 gap-2">
                    <Button onPress={()=>setFile(null)} size="sm" radius="sm" className="">Cancel</Button>
                    <Button onPress={changeProfileImage} size="sm" radius="sm" className="bg-blue-500">Save</Button>
                    </div>}
            </div>
        </div>
        <div className="w-full">
        <h1 className="text-white/50 mb-4">Personal Details</h1>
        <div className="space-y-2">
    <div className="flex justify-between items-center">
        <div className="flex">
        <p className="w-[120px] text-white/50">Name:</p>
        <p className="capitalize">{artist.user.fullname}</p>
        </div>
        <ChangeName user={artist.user}/>
    </div>
    <div className="flex items-center justify-between">
        <div className="flex">
        <p className="w-[120px] text-white/50">Address:</p>
        <p className="capitalize">{artist.user.profile?.complete_address}</p>
        </div>
        <ChangeAddress />
    </div>
    <div className="flex justify-between items-center">
        <div className="flex">
        <p className="w-[120px] text-white/50">Date of Birth:</p>
        <p className="capitalize">{artist.user.profile?.dob}</p>
        </div>
        <ChangeDob />
    </div>
    <div className="flex justify-between items-center">
        <div className="flex">
        <p className="w-[120px] text-white/50">Gender:</p>
        <p className="capitalize">{artist.user.profile?.gender}</p>
        </div>
        <ChangeGender user={artist.user}/>
    </div>
    <div className="flex items-center justify-between">
        <div className="flex">
        <p className="w-[120px] text-white/50">Phone:</p>
        <p className="capitalize">{artist.user.profile?.phone}</p>
        </div>
        <ChangePhone />
    </div>
    </div>
    </div>
</div>
 )
}

const SocialLinks = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {

    return (
        <div className="p-4 relative min-w-[45%]  bg-white/5 rounded-md">
            <EditSocialLinks artist={artist}/>
            <h1 className="mb-4 text-white/50">Social Links</h1>
            <div className="space-y-2">
                {artist.fb_link &&
                <div className="flex gap-2">
                    <Image width={24} src="/media/facebook.png"/>
                    <Link href={artist.fb_link}><p>{artist.fb_link}</p></Link>
                </div>
                }
                {artist.twitter &&
                <div className="flex gap-2">
                    <Image width={24} src="/media/twitter.png"/>
                    <Link href={artist.twitter}><p>{artist.twitter}</p></Link>
                </div>
                }
                {artist.instagram &&
                <div className="flex gap-2">
                    <Image width={24} src="/media/instagram.png"/>
                    <Link href={artist.instagram}><p>{artist.instagram}</p></Link>
                </div>
                }
                {artist.youtube &&
                <div className="flex gap-2">
                    <Image width={24} src="/media/youtube.png"/>
                    <Link href={artist.youtube}><p>{artist.youtube}</p></Link>
                </div>
                }
                {artist.spotify &&
                <div className="flex gap-2">
                    <Image width={24} src="/media/spotify.png"/>
                    <Link href={artist.spotify}><p>{artist.spotify}</p></Link>
                </div>
                }

            </div>
        </div>
    )
}


const ArtistDetails = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {

    const {data:allGenres} = useFetchGenresQuery()
    const [edit, setEdit] = useState(false)
    return (
        <div className="p-4 w-full space-y-4 rounded-md bg-white/5">
            <h1 className="text-white/50 mb-4">Echoee Details</h1>
            <div>
                <p>Genres</p>
                <div className="space-x-2">
                    {artist.genres?.map(genre=>(
                       <Genre genreCount={artist.genres?.length || 0} genre={genre}/>
                    ))}
                  <AddGenre myGenres={artist.genres || []}/>
                </div>
            </div>
            <div>
                <p className="mb-3">Rates</p>

                <Table  radius="sm" classNames={{wrapper:'bg-transparent',tbody:'capitalize',tr:"group",td:'text-xs text-white/80'}}>
                    <TableHeader>
                        <TableColumn>Rate</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody items={artist.rates}>
                        {(item)=>(
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>&#8369;{parseFloat(item.amount.toString())}</TableCell>
                                <TableCell>{item.description ? item.description : ''}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100">
                                        <EditRate rate={item}/>
                                        <DeleteRate rate={item}/>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>

                </Table>
                <Spacer y={2}/>
                <AddRate artist={artist}/>

            </div>
        </div>
    )
}



const Genre = ({genre, genreCount}:{genre:z.infer<typeof GenreSchema>, genreCount:number}) => {
    const spanRef = useRef<HTMLSpanElement|null>(null)
    const [show, setShow] = useState(false)
    const {isOpen, onClose, onOpen,onOpenChange} = useDisclosure()
    const [deleteGenre] = useDeleteGenreMutation()


    const onMouseOver = () => {
        setShow(true)
    }
    const onMouseOut = () => {
        setShow(false)
    }

    const handleDelete = async () =>{
        await deleteGenre(genre.id.toString())
        onClose()
    }


    return (
        <>
        <span onMouseOut={onMouseOut} onMouseOver={onMouseOver} ref={spanRef}>
            {show ?
            <Badge color="danger" classNames={{base:'border-none', badge:'border-none'}} variant="solid" content={< IoClose onClick={()=>{genreCount > 1 ? onOpen() : toast.error("You must have at least one genre.")}} className="hover:cursor-pointer" />}>
                <Chip color="primary" variant="dot" classNames={{base:'text-white '}} key={genre.id}>{genre.name}</Chip>
            </Badge> : <Chip color="primary" variant="dot" classNames={{base:'text-white '}} key={genre.id}>{genre.name}</Chip>}
        </span>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalHeader>
                Delete Genre
            </ModalHeader>
            <ModalContent>
                <ModalBody>
                        <h1>Do you want to delete this genre?</h1>
                </ModalBody>
                <ModalFooter>
                    <Button radius="sm" onPress={onClose}>No</Button>
                    <Button onPress={handleDelete} color="danger" variant="bordered" radius="sm">Yes</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
