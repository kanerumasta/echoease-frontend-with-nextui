'use client'

import { useFetchFollowersQuery } from "@/redux/features/artistApiSlice"
import { ArtistInSchema } from "@/schemas/artist-schemas"
import { Spinner } from "@nextui-org/spinner"
import { User } from "@nextui-org/user"
import { z } from "zod"

type FollowersProps = {
    artist: z.infer<typeof ArtistInSchema>
}

export const Followers:React.FC<FollowersProps> = ({artist}) => {
    const {data:followers, isLoading} = useFetchFollowersQuery(artist.id)
    return (
        <div className="flex flex-col items-start gap-3 rounded-lg ">
            <h1 className="capitalize text-lg mb-4">{`${artist.user.first_name}'s Followers`}</h1>
           {isLoading &&
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner />
                </div>
}
        <div className=" max-w-[300px] flex flex-col items-start gap-3  max-h-[400px] min-h-[400px] min-w-[300px] overflow-y-scroll scrollbar-hide">
            {followers?.map((follower)=>(
                <User name={follower.fullname} description={follower.role==='client' ? 'Echoer' : follower.role === 'artist' ? 'Echoee':''} avatarProps={{src:`${process.env.NEXT_PUBLIC_HOST}${follower.profile?.profile_image}`}}/>
            ))}
            </div>


        </div>
    )
}
