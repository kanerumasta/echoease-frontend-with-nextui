import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState } from "react";

type Props = {
  mediaUrls: string[];
  onClose: () => void;
};

const MediaPlayer = ({ mediaUrls, onClose }: Props) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const style = useSpring({
    opacity: 1,
  });

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaUrls.length);
  };

  const handlePrevious = () => {
    setCurrentMediaIndex(
      (prevIndex) => (prevIndex - 1 + mediaUrls.length) % mediaUrls.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button onClick={onClose} className="absolute top-2 right-2 text-white">
        X
      </button>
      <animated.div
        style={style}
        className="relative bg-gradient-to-br p-4 from-blue-400/70 to-black/70 via-blue-950/70 rounded-lg overflow-hidden md:w-[90vw] w-full"
      >
        {mediaUrls.length > 0 && (
          <div className="flex flex-col items-center">
            {mediaUrls[currentMediaIndex].endsWith(".mp4") ? (
              <video controls className="w-full h-[80vh]">
                <source
                  src={`${process.env.NEXT_PUBLIC_HOST}${mediaUrls[currentMediaIndex]}`}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                className="h-[80vh]"
                src={`${process.env.NEXT_PUBLIC_HOST}${mediaUrls[currentMediaIndex]}`}
                alt={`Media ${currentMediaIndex + 1}`}
              />
            )}
            <div className="flex justify-between w-full p-4">
              <button
                onClick={handlePrevious}
                disabled={currentMediaIndex === 0}
              >
                Previous
              </button>
              <span>{`${currentMediaIndex + 1} / ${mediaUrls.length}`}</span>
              <button
                onClick={handleNext}
                disabled={currentMediaIndex === mediaUrls.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </animated.div>
    </div>
  );
};

export default MediaPlayer;
