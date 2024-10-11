"use client";

import CustomImage from "@/components/image";
import { useFetchPortfolioQuery } from "@/redux/features/artistApiSlice";
import { ArtistInSchema, InPortfolioItemSchema, MediaSchema } from "@/schemas/artist-schemas";
import { useDisclosure } from "@nextui-org/modal";
import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { z } from "zod";


export const PortfolioSection = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {

  const { data } = useFetchPortfolioQuery(artist.id.toString());
  console.log('data',data)

  return (
    <div className="flex flex-col min-h-screen lg:flex-row md:px-20 gap-4">
        <Portfolio artist={artist}/>

    </div>
  );
};


const Portfolio = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {

    const {data:portfolio, isLoading} = useFetchPortfolioQuery(artist.id.toString())

    return <div className="w-full flex  flex-wrap justify-center items-center gap-3 ">
        {portfolio?.items.map((portfolioItem)=>(
            <PortfolioItem key={portfolioItem.id} portfolioItem={portfolioItem}/>
        ))}


    </div>
}

const PortfolioItem = ({portfolioItem}:{portfolioItem:z.infer<typeof InPortfolioItemSchema>} ) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

    return(
            <>
            <div key={portfolioItem.id} className="relative w-full lg:min-w-[600px] lg:max-w-[600px] rounded-lg bg-white/5 p-4 group">
                <h1 className="text-center text-2xl capitalize my-3">{portfolioItem.title}</h1>
                <MediaGrid maxVisible={4} key={portfolioItem.id} portfolioItem={portfolioItem}/>
            </div>

        </>

)
}

const MediaGrid = ({ portfolioItem, maxVisible }: { portfolioItem: z.infer<typeof InPortfolioItemSchema>, maxVisible?: number }) => {

    const [isOpen, setIsOpen] = useState(false)

    const filteredMedias = portfolioItem.medias.slice(0, maxVisible || 4); // Default to 4 if maxVisible is not provided


    return (
        <>
        <div
            onClick={()=>setIsOpen(true)}
            className="w-full flex flex-wrap items-center justify-center mx-auto  cursor-pointer"
        >
            {filteredMedias.map((media,index) => (
                <div key={media.id} className="relative overflow-hidden rounded-md">
                    {index === filteredMedias.length -1 && filteredMedias.length < portfolioItem.medias.length && <div className="absolute flex items-center justify-center top-0 left-0 bg-black/45 min-w-full min-h-full text-3xl font-bold">+{portfolioItem.medias.length - filteredMedias.length}</div>}
                    <MediaItem key={media.id} media={media} />
                </div>
            ))}

        </div>

        {isOpen && <MediaModal onClose={()=>setIsOpen(false)} medias={portfolioItem.medias}/>}
        </>
    );
};

const MediaItem = React.memo(({ media }: { media: z.infer<typeof MediaSchema>}) => {
    const mediaSrc = `${process.env.NEXT_PUBLIC_HOST}${media.file}`;
    return (
        <div className="flex-shrink-0 m-1">
            {media.media_type === 'video' ? (
                <div className="w-[200px] h-[150px] overflow-hidden">
                    <video className="w-full h-full object-cover" >
                        <source src={mediaSrc} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <CustomImage className="w-full h-full" width="200px" height="150px" src={mediaSrc} />
            )}

        </div>
    );
});

const MediaModal = ({medias,onClose}:{medias:z.infer<typeof MediaSchema>[], onClose:()=>void}) => {
    const [heroMedia, setHeroMedia] = useState(medias[0])

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const {isOpen, onClose:close, onOpen, onOpenChange} = useDisclosure()

    // Effect to update video source when heroMedia changes
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load(); // Reload the video
        }
    }, [heroMedia]);


    return (
        <div className="fixed z-50 flex items-center justify-center top-0 left-0  w-screen min-h-screen bg-black/65 backdrop-blur-lg">
            <IoClose onClick={onClose} className="absolute hover:cursor-pointer top-4 right-4" size={40}/>
            <div className="w-full lg:w-2/4 md:w-3/4 flex flex-col items-center ">
                <div className="h-[60vh]   bg-black  border-2 border-white/50 flex justify-center items-center w-full">
                    <div className=" relative  ">
                            {heroMedia.media_type === 'video' ? (
                            <div className="w-full  peer h-full overflow-hidden">
                                <video ref={videoRef} // Reference to the video element
                                            key={heroMedia.file} className="w-full h-full object-cover" controls autoPlay>
                                    <source src={`${process.env.NEXT_PUBLIC_HOST}${heroMedia.file}`} />
                                    Your browser does not support the video tag.
                                </video>

                            </div>
                        ) : (
                            <div className="peer">
                        <img className="w-full h-[57vh] bg-contain" src={`${process.env.NEXT_PUBLIC_HOST}${heroMedia.file}`}/>
                        </div>
                            )}



                    </div>

                </div>

                <div className="flex items-center gap-3 mt-4 p-4  rounded-lg bg-white/10 flex-wrap justify-center">
                {medias.map((media)=>(
                    <div className="hover:cursor-pointer" key={media.id} onClick={()=>{setHeroMedia(media)}}>
                         {media.media_type === 'video' ? (
                            <div className="w-[100px] h-[100px] rounded-md overflow-hidden">
                                <video   className="w-full h-full object-cover" >
                                    <source src={`${process.env.NEXT_PUBLIC_HOST}${media.file}`} />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (

                        <CustomImage className="min-w-[100px] max-w-[100px]" width="100px" height="100px" src={`${process.env.NEXT_PUBLIC_HOST}${media.file}`}/>
                    )}
                            </div>
                ))}

                </div>
            </div>
        </div>
    )
}
