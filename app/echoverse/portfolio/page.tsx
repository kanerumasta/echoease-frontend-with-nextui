"use client";

import { z } from "zod";
import React, { useEffect, useRef, useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { HiDotsVertical } from "react-icons/hi";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { toast } from "react-toastify";

import { DeleteIcon } from "@/components/icons/delete";
import {
  ArtistInSchema,
  InPortfolioItemSchema,
  MediaSchema,
} from "@/schemas/artist-schemas";
import {
  useDeletePortofolioItemMediaMutation,
  useDeletePortofolioItemMutation,
  useFetchDetailCurrentArtistQuery,
  useFetchPortfolioQuery,
} from "@/redux/features/artistApiSlice";
import CustomImage from "@/components/image";
import { cn } from "@/lib/utils";

import { CreatePortofolioItem } from "./forms/create-portfolio-item";
import { AddMedia } from "./forms/add-media";

export default function PortfolioPage() {
  const [refresh, setRefresh] = useState(0);
  const {
    data: artist,
    isLoading,
    isError,
  } = useFetchDetailCurrentArtistQuery();

  return (
    <div>
      {artist && (
        <div className="">
          <Portfolio artist={artist} />
          <CreatePortofolioItem artist={artist} />
        </div>
      )}
    </div>
  );
}

const Portfolio = ({ artist }: { artist: z.infer<typeof ArtistInSchema> }) => {
  const { data: portfolio, isLoading } = useFetchPortfolioQuery(
    artist.id.toString(),
  );

  return (
    <div className="w-full flex  flex-wrap justify-center items-center gap-3 ">
      {portfolio?.items.map((portfolioItem) => (
        <PortfolioItem key={portfolioItem.id} portfolioItem={portfolioItem} />
      ))}
    </div>
  );
};

const PortfolioItem = ({
  portfolioItem,
}: {
  portfolioItem: z.infer<typeof InPortfolioItemSchema>;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const addMediaModal = useDisclosure();
  const [deletePortfolioItem, { isLoading }] =
    useDeletePortofolioItemMutation();
  const handleDeleteItem = async () => {
    await deletePortfolioItem(portfolioItem.id.toString()).unwrap();
    onClose();
  };

  return (
    <>
      <div
        key={portfolioItem.id}
        className="relative w-full lg:min-w-[450px] lg:max-w-[450px] rounded-lg bg-white/5 p-4 group"
      >
        <h1 className="text-center text-2xl capitalize my-3">
          {portfolioItem.title}
        </h1>
        <MediaGrid
          key={portfolioItem.id}
          maxVisible={4}
          portfolioItem={portfolioItem}
        />
        <Dropdown radius="sm">
          <DropdownTrigger className="absolute top-2 right-2">
            <Button
              isIconOnly
              className="opacity-0 text-2xl hover:cursor-pointer group-hover:opacity-100"
              color="primary"
              radius="full"
              variant="light"
            >
              <HiDotsVertical size={24} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              startContent={<IoAdd />}
              onClick={addMediaModal.onOpen}
            >
              Add Item
            </DropdownItem>
            <DropdownItem
              startContent={<DeleteIcon className="text-danger-500" />}
              onClick={onOpen}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Modal
          isDismissable={false}
          isOpen={addMediaModal.isOpen}
          onOpenChange={addMediaModal.onOpenChange}
        >
          <ModalContent>
            <ModalHeader>Add Media</ModalHeader>
            <ModalBody>
              <AddMedia
                portfolioItem={portfolioItem}
                onClose={addMediaModal.onClose}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>

      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Delete Portfolio Item</ModalHeader>
          <ModalBody>
            <h1 className="text-lg">Do you want to delete this portfolio?</h1>
            <p className="text-sm text-white/20">
              This action cannot be undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button radius="sm" onPress={onClose}>
              No
            </Button>
            <Button
              color="danger"
              isDisabled={isLoading}
              isLoading={isLoading}
              radius="sm"
              onClick={handleDeleteItem}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const MediaGrid = ({
  portfolioItem,
  maxVisible,
}: {
  portfolioItem: z.infer<typeof InPortfolioItemSchema>;
  maxVisible?: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredMedias = portfolioItem.medias.slice(0, maxVisible || 4); // Default to 4 if maxVisible is not provided

  return (
    <>
      <div
        className="w-full flex flex-wrap items-center justify-center mx-auto  cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {filteredMedias.map((media, index) => (
          <div key={media.id} className="relative overflow-hidden rounded-md">
            {index === filteredMedias.length - 1 &&
              filteredMedias.length < portfolioItem.medias.length && (
                <div className="absolute flex items-center justify-center top-0 left-0 bg-black/45 min-w-full min-h-full text-3xl font-bold">
                  +{portfolioItem.medias.length - filteredMedias.length}
                </div>
              )}
            <MediaItem key={media.id} media={media} />
          </div>
        ))}
      </div>
      {/* modal */}
      {isOpen && (
        <MediaModal
          medias={portfolioItem.medias}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const MediaItem = React.memo(
  ({ media }: { media: z.infer<typeof MediaSchema> }) => {
    const mediaSrc = `${process.env.NEXT_PUBLIC_HOST}${media.file}`;

    return (
      <div className="flex-shrink-0 m-1">
        {media.media_type === "video" ? (
          <div className="w-[200px] h-[150px] overflow-hidden">
            <video className="w-full h-full object-cover">
              <source src={mediaSrc} />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <CustomImage
            className="w-full h-full"
            height="150px"
            src={mediaSrc}
            width="200px"
          />
        )}
      </div>
    );
  },
);

const MediaModal = ({
  medias,
  onClose,
}: {
  medias: z.infer<typeof MediaSchema>[];
  onClose: () => void;
}) => {
  const [heroMedia, setHeroMedia] = useState(medias[0]);
  const [deletePortfolioItemMedia] = useDeletePortofolioItemMediaMutation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isOpen, onClose: close, onOpen, onOpenChange } = useDisclosure();

  // Effect to update video source when heroMedia changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the videox
    }
  }, [heroMedia]);

  const handleDeleteMedia = async (id: number) => {
    await deletePortfolioItemMedia(id.toString());
    toast.success("Deleted successfully.");
    close();
    onClose();
  };

  return (
    <div className="fixed z-50 flex items-center justify-center top-0 left-0 w-screen min-h-screen bg-black/65 backdrop-blur-lg">
      <IoClose
        className="absolute hover:cursor-pointer top-4 right-4"
        size={40}
        onClick={onClose}
      />
      <div className="w-full lg:w-2/4 md:w-3/4 flex flex-col items-center">
        <div className="h-[60vh] bg-black border-2 border-white/50 flex justify-center items-center w-full overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            {heroMedia.media_type === "video" ? (
              <video
                key={heroMedia.file}
                ref={videoRef}
                autoPlay
                controls
                className="w-full h-full object-contain" // Use object-contain to maintain aspect ratio
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_HOST}${heroMedia.file}`}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                alt="Media content"
                className="w-full h-full object-contain" // Use object-contain for images too
                src={`${process.env.NEXT_PUBLIC_HOST}${heroMedia.file}`}
              />
            )}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="absolute top-2 right-2"
                  radius="full"
                  variant="flat"
                >
                  <HiDotsVertical
                    className="hover:text-blue-500 hover:cursor-pointer"
                    size={24}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  startContent={<DeleteIcon className="text-danger-500" />}
                  onClick={onOpen}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                <ModalHeader>Delete</ModalHeader>
                <ModalBody>
                  Do you want to delete this item?
                  <small>This action cannot be undone</small>
                </ModalBody>
                <ModalFooter>
                  <Button radius="sm" onPress={close}>
                    No
                  </Button>
                  <Button
                    color="danger"
                    radius="sm"
                    onPress={() => handleDeleteMedia(heroMedia.id)}
                  >
                    Yes
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4 p-4 rounded-lg bg-white/10 flex-wrap justify-center">
          {medias.map((media) => (
            <div
              key={media.id}
              className={cn("hover:cursor-pointer rounded-lg opacity-50", {
                "scale-110 border-2 border-white/10 opacity-100":
                  heroMedia.id === media.id,
              })}
              onClick={() => {
                setHeroMedia(media);
              }}
            >
              {media.media_type === "video" ? (
                <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                  <video className="w-full h-full object-cover">
                    <source
                      src={`${process.env.NEXT_PUBLIC_HOST}${media.file}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <CustomImage
                  className="min-w-[100px] max-w-[100px]"
                  height="100px"
                  src={`${process.env.NEXT_PUBLIC_HOST}${media.file}`}
                  width="100px"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
