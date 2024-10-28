import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface RatingsProps {
  rating: number;
}

export const Ratings = ({ rating }: RatingsProps) => {
  // Get the whole number of full stars
  const fullStars = Math.floor(rating);

  // Check if the rating has a half star (e.g., 4.5 will give a half star)
  const hasHalfStar = rating % 1 >= 0.1;

  // Calculate the number of empty stars to display (total stars should be 5)
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: fullStars }, (_, index) => (
        <IoStar key={index} className="text-yellow-400" size={20} />
      ))}

      {hasHalfStar && <IoStarHalf className="text-yellow-400" size={20} />}

      {Array.from({ length: emptyStars }, (_, index) => (
        <IoStarOutline key={index} className="text-yellow-400" size={20} />
      ))}
    </div>
  );
};
