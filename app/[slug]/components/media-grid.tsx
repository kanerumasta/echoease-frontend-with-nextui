import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import MediaPlayer from "./media-player";

type Props = {
  maxVisible: number;
  mediaUrls: string[];
};

// Portfolio grid component
export const MediaGrid = ({ maxVisible, mediaUrls }: Props) => {
  const visibleMedia = mediaUrls.slice(0, maxVisible); // Show only the first 'maxVisible' media
  const remainingCount = mediaUrls.length - maxVisible;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const openModal = () => {
    setSelectedMedia(mediaUrls);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap relative gap-2">
        {visibleMedia.map((media, mediaIndex) => (
          <div
            key={mediaIndex}
            className={cn(
              "hover:cursor-pointer hover:opacity-80 transition duration-150 ease-in-out flex-grow w-[150px] h-[200px] rounded-md overflow-hidden",
              {
                relative: mediaIndex === 3,
              }
            )}
            onClick={openModal} // Open modal on click
          >
            {media.endsWith(".mp4") ? (
              <div className="relative w-full h-full">
                <video className="w-full h-full object-cover" width={200}>
                  <source src={`${process.env.NEXT_PUBLIC_HOST}${media}`} />
                </video>
                <FaPlay
                  color="white"
                  size={30}
                  className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
                />
              </div>
            ) : (
              <img
                className="w-full h-full object-cover"
                width={200}
                height={200}
                src={`${process.env.NEXT_PUBLIC_HOST}${media}`}
                alt="Portfolio Media"
              />
            )}
            {mediaIndex === maxVisible - 1 &&
              mediaUrls.length !== maxVisible && (
                <div className="absolute bottom-0 right-0 bg-black bg-opacity-70 flex items-center justify-center text-3xl text-white w-full h-full rounded-md z-10">
                  {`+${remainingCount}`}
                </div>
              )}
          </div>
        ))}
      </div>

      {/* Modal for media player */}
      {isModalOpen && (
        <MediaPlayer
          mediaUrls={selectedMedia}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
