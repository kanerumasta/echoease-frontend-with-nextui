"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { z } from "zod";
import { motion } from "framer-motion"; // Import motion from framer-motion
import CustomImage from "@/components/image";
import { cn } from "@/lib/utils";
import { useFetchPortfolioQuery } from "@/redux/features/artistApiSlice";
import {
    ArtistInSchema,
    InPortfolioItemSchema,
    MediaSchema,
} from "@/schemas/artist-schemas";
import { useInView } from "react-intersection-observer";

export const PortfolioSection = ({
  artist,
}: {
  artist: z.infer<typeof ArtistInSchema>;
}) => {
  return (
    <div className="flex flex-col min-h-screen lg:flex-row md:px-20 gap-4">
      <Portfolio artist={artist} />
    </div>
  );
};

const Portfolio = ({ artist }: { artist: z.infer<typeof ArtistInSchema> }) => {
  const { data: portfolio } = useFetchPortfolioQuery(
    artist.id.toString(),
  );

  return (
    <div className="w-full flex flex-wrap gap-3">
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
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, translateY: 20 }} // Initial state
      animate={inView ? { opacity: 1, translateY: 0 } : {opacity:0}} // Animate when in view
      transition={{ duration: 0.5 }} // Transition duration
      className={cn("relative w-full min-h-[200px] max-h-[400px] lg:min-w-[430px] lg:max-w-[430px] rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 group")}
    >
      <h1 className="text-xl capitalize mb-2">{portfolioItem.title}</h1>
      <p className="w-2/4 mb-4 text-white/40 text-sm">
        {portfolioItem.description}
      </p>
      <MediaGrid
        key={portfolioItem.id}
        maxVisible={4}
        portfolioItem={portfolioItem}
      />
    </motion.div>
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
        className="w-full flex flex-wrap items-center justify-center mx-auto cursor-pointer"
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
          <div className="md:w-[180px] md:h-[150px] w-[130px] h-[100px]  overflow-hidden">
            <video className="w-full h-full object-cover">
              <source src={mediaSrc} />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <CustomImage
            className="md:w-[180px] md:h-[150px] w-[130px] h-[100px]"
            height=""
            src={mediaSrc}
            width=""
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Effect to update video source when heroMedia changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video
    }
  }, [heroMedia]);

  return (
    <div className="fixed z-50 flex items-center justify-center top-0 left-0 w-screen min-h-screen bg-black/65 backdrop-blur-lg">
      <IoClose
        className="absolute hover:cursor-pointer top-4 right-4"
        size={40}
        onClick={onClose}
      />
      <div className="w-full lg:w-2/4 md:w-3/4 flex flex-col items-center">
        <div className="h-[60vh] bg-black border-2 border-white/50 flex justify-center items-center w-full">
          <div className="relative w-full h-full flex items-center justify-center">
            {heroMedia.media_type === "video" ? (
              <video
                key={heroMedia.file}
                ref={videoRef}
                autoPlay
                controls
                className="w-full h-full object-contain"
              >
                <source
                  src={`${process.env.NEXT_PUBLIC_HOST}${heroMedia.file}`}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                alt="Media content"
                className="w-full h-full object-contain"
                src={`${process.env.NEXT_PUBLIC_HOST}${heroMedia.file}`}
              />
            )}
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
