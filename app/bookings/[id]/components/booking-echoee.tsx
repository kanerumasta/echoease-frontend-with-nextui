import CustomImage from "@/components/image"
import { ArtistInSchema } from "@/schemas/artist-schemas"
import React from "react"
import { z } from "zod"

type BookingEchoeeProps = {
    artist:z.infer<typeof ArtistInSchema>
}

export const BookingEchoee:React.FC<BookingEchoeeProps> = ({artist}) => {
        return <>
         <div>
            <div className="flex gap-3">
                <CustomImage width="100px" height="100px" src={`${process.env.NEXT_PUBLIC_HOST}${artist.user.profile?.profile_image}`}/>
                <p className="text-2xl font-bold capitalize">{artist.user.fullname}</p>
            </div>
            </div>
        </>
}
