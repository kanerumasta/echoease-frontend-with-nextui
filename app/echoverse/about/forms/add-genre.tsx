import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { z } from "zod";

import { GenreSchema } from "@/schemas/artist-schemas";
import {
  useAddGenreMutation,
  useFetchGenresQuery,
} from "@/redux/features/artistApiSlice";
import { MultipleGenresPicker } from "@/components/multiple-genres-picker";

export const AddGenre = () => {
  const { data: allGenres } = useFetchGenresQuery();
  const [pickedGenres, setPickedGenres] = useState<
    z.infer<typeof GenreSchema>[]
  >([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addGenre] = useAddGenreMutation();
  const onSubmit = () => {
    for (const genre of pickedGenres) {
      addGenre(genre.id.toString());
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500"
        radius="full"
        size="sm"
        startContent={<IoAdd />}
        onPress={onOpen}
      >
        Add
      </Button>
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Pick your genres</ModalHeader>
          <ModalBody>
            <div>
              {allGenres && (
                <MultipleGenresPicker
                  genres={allGenres}
                  setPickedGenres={setPickedGenres}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button>Cancel</Button>
            <Button onPress={onSubmit}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
