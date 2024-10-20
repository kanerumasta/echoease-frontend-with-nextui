import { useState } from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface RatingPickerProps {
  initialRating?: number; // Optional initial rating if you want to set a default
  onRatingChange: (rating: number) => void; // Callback to handle rating change
}

export const RatingPicker = ({ initialRating = 0, onRatingChange }: RatingPickerProps) => {
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
          <span key={index} onClick={() => handleClick(starRating)} className="cursor-pointer">
            {selectedRating >= starRating ? (
              <IoStar size={50} className="text-yellow-400" />
            ) : (
              <IoStarOutline size={50} className="text-yellow-400" />
            )}
          </span>
        );
      })}
    </div>
  );
};
