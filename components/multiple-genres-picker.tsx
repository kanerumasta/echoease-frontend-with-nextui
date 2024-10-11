import { cn } from "@/lib/utils"
import { GenreSchema } from "@/schemas/artist-schemas"
import { Chip } from "@nextui-org/chip"
import { Dispatch, SetStateAction, useState } from "react"
import { z } from "zod"

type Props = {
    genres: z.infer<typeof GenreSchema>[],

    setPickedGenres: Dispatch<SetStateAction<z.infer<typeof GenreSchema>[]>>

}

export const MultipleGenresPicker = ({ genres, setPickedGenres }: Props) => {

    // Toggle genre selection
    const handleGenreToggle = (selectedGenre: z.infer<typeof GenreSchema>) => {
        setPickedGenres((prevPickedGenres) => {
            if (prevPickedGenres.find(genre => genre.id === selectedGenre.id)) {
                // If already selected, remove it from picked genres
                return prevPickedGenres.filter(genre => genre.id !== selectedGenre.id);
            } else {
                // Otherwise, add it to picked genres
                return [...prevPickedGenres, selectedGenre];
            }
        });
    }

    return (
        <div>
            {genres.map((genre) => (
                <GenreItem key={genre.id} genre={genre} onToggle={() => handleGenreToggle(genre)} />
            ))}
        </div>
    )
}

const GenreItem = ({ genre, onToggle }: {genre: z.infer<typeof GenreSchema>, onToggle: () => void }) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleClick = () => {
        setIsSelected(!isSelected)
        onToggle() // Notify the parent when the genre is toggled
    }


    return (
        <Chip
            variant="dot"
            onClick={ handleClick}
            className={cn("p-2 border-2 cursor-pointer", { "bg-blue-500": isSelected })}
        >
            {genre.name}
        </Chip>
    )
}
