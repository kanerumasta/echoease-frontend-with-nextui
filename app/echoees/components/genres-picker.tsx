import { Chip } from "@nextui-org/chip";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { useFetchGenresQuery } from "@/redux/features/artistApiSlice";
import { GenreSchema } from "@/schemas/artist-schemas";

type Props = {
  setPickedGenres: Dispatch<SetStateAction<z.infer<typeof GenreSchema>[]>>;
};

export const MultipleGenresPicker = ({ setPickedGenres }: Props) => {
  const { data: genres } = useFetchGenresQuery();

  // Toggle genre selection
  const handleGenreToggle = (selectedGenre: z.infer<typeof GenreSchema>) => {
    setPickedGenres((prevPickedGenres) => {
      if (prevPickedGenres.find((genre) => genre.id === selectedGenre.id)) {
        // If already selected, remove it from picked genres
        return prevPickedGenres.filter(
          (genre) => genre.id !== selectedGenre.id,
        );
      } else {
        // Otherwise, add it to picked genres
        return [...prevPickedGenres, selectedGenre];
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {genres &&
        genres.map((genre) => (
          <GenreItem
            key={genre.id}
            genre={genre}
            onToggle={() => handleGenreToggle(genre)}
          />
        ))}
    </div>
  );
};

const GenreItem = ({
  genre,
  onToggle,
}: {
  genre: z.infer<typeof GenreSchema>;
  onToggle: () => void;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onToggle(); // Notify the parent when the genre is toggled
  };

  return (
    <Chip
      className={cn("p-2 border-2 cursor-pointer", {
        "bg-blue-500": isSelected,
      })}
      variant="dot"
      onClick={handleClick}
    >
      {genre.name}
    </Chip>
  );
};