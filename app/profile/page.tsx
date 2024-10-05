'use client'
import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice"
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice"
import { Spacer } from "@nextui-org/spacer"

export default function ProfilePage(){
    const {data:currentUser, isLoading} = useFetchCurrentUserQuery()


    return (
        <div className="">
            <div className="flex mb-20 relative gap-2 bg-white/20 h-[200px] rounded-lg md:justify-start p-4 justify-center">
                <div className="absolute ring-2 ring-black/45 ring-offset-1 ring-offset-transparent bottom-[-30%] h-[200px] w-[200px] overflow-hidden bg-white rounded-full">
                    {currentUser?.profile?.profile_image && <img className="w-full h-full object-cover" src={`${process.env.NEXT_PUBLIC_HOST}${currentUser?.profile?.profile_image}`} />}
                </div>

            </div>

            <div>
                <p className="font-bold tracking-wide">{currentUser?.fullname}</p>
            </div>
     </div>
    )
}


const Header = () => {
    return <div className="p-4 rounded-md bg-white/20">
    </div>
}
