import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface RatingPickerProps {
  initialRating?: number; // Optional initial rating if you want to set a default
  onRatingChange: (rating: number) => void; // Callback to handle rating change
}

export const RatingPicker = ({
  initialRating = 0,
  onRatingChange,
}: RatingPickerProps) => {
  const [selectedRating, setSelectedRating] = useState<number>(initialRating);

  // Handle click to set the rating
  const handleClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange(rating); // Call the parent handler to notify rating change
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {Array.from({ length: 5 }, (_, index) => {
        const starRating = index + 1;

        return (
          <span
            key={index}
            className="cursor-pointer"
            onClick={() => handleClick(starRating)}
          >
            {selectedRating >= starRating ? (
              <IoStar className="text-yellow-400" size={50} />
            ) : (
              <IoStarOutline className="text-yellow-400" size={50} />
            )}
          </span>
        );
      })}
    </div>
  );
};
