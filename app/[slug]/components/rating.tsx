import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface RatingsProps {
  rating: number;
  size:number
}

export const Ratings = ({ rating,size }: RatingsProps) => {
  // Get the whole number of full stars
  const fullStars = Math.floor(rating);

  // Check if the rating has a half star (e.g., 4.5 will give a half star)
  const hasHalfStar = rating % 1 >= 0.1;

  // Calculate the number of empty stars to display (total stars should be 5)
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: fullStars }, (_, index) => (
        <IoStar key={index} className="text-yellow-500" size={size} />
      ))}

      {hasHalfStar && <IoStarHalf className="text-yellow-500" size={size} />}

      {Array.from({ length: emptyStars }, (_, index) => (
        <IoStar key={index} className="text-white/50" size={size} />
      ))}
    </div>
  );
};
