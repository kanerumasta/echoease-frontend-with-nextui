import { ArtistInSchema } from "@/schemas/artist-schemas";
import { z } from "zod";

const ImagePart = ({imageUrl} :{imageUrl?:string | null}) => {
    return <div className="w-[100px] h-[100px] overflow-hidden">
        <img className="w-full h-full object-cover" src={`${process.env.NEXT_PUBLIC_HOST}${imageUrl}`}/>
    </div>
}

const DetailPart = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {
    return <div>
        <p className="capitalize font-semibold">{artist.user.fullname}</p>

    </div>
}

export const ArtistConnectionBar = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {
    return <div className="h-[150px] bg-white/30 flex gap-2 rounded-md p-4">
      <ImagePart imageUrl={artist.user.profile?.profile_image}/>
      
        <DetailPart artist={artist}/>
    </div>
}
