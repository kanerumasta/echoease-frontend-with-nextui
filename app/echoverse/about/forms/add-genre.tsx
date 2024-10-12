import { MultipleGenresPicker } from "@/components/multiple-genres-picker"
import { useAddGenreMutation, useFetchGenresQuery } from "@/redux/features/artistApiSlice"
import { GenreSchema } from "@/schemas/artist-schemas"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { useEffect, useState } from "react"
import { IoAdd } from "react-icons/io5"
import { z } from "zod"

export const AddGenre = ({myGenres}:{myGenres:z.infer<typeof GenreSchema>[]}) => {
    const {data:allGenres} = useFetchGenresQuery()
    const [pickedGenres, setPickedGenres] = useState<z.infer<typeof GenreSchema>[]>([])
    const {isOpen, onClose, onOpen, onOpenChange} = useDisclosure()
    const [addGenre] = useAddGenreMutation()
    const onSubmit = () => {
        for(const genre of pickedGenres){
            addGenre(genre.id.toString())
        }
    }

    useEffect(()=>{
        console.log([pickedGenres])
    },[pickedGenres])
    return <>
        <Button className="bg-blue-500" size="sm" radius="full" onPress={onOpen} startContent={<IoAdd />}>Add</Button>
        <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Pick your genres
                </ModalHeader>
                <ModalBody>
                    <div>
                        {allGenres && <MultipleGenresPicker setPickedGenres={setPickedGenres} genres={allGenres}/>}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button>Cancel</Button>
                    <Button onPress={onSubmit}>Add</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}
