import CustomImage from "@/components/image"
import { ConnectionRequestSchema } from "@/schemas/artist-schemas"
import { Button } from "@nextui-org/button"
import { Spacer } from "@nextui-org/spacer"
import { z } from "zod"

type Props = {
    requests : z.infer<typeof ConnectionRequestSchema>[]
}
export const ConnectionRequests = ({requests}:Props) => {
return <>
    <p className="font-medium text-white mb-6">Connection Requests</p>
        <div className="flex gap-2 w-full overflow-x-scroll scrollbar-hide">
            {requests.map(req=>(
                <div className="min-w-[150px] bg-white/20 p-2 rounded-md">
                    <CustomImage width="100%" height="100px" src={`${process.env.NEXT_PUBLIC_HOST}${req.sender.user.profile?.profile_image}`} />
                    <div>
                        <p className="text-sm capitalize">{req.sender.user.fullname}</p>
                    </div>
                    <Spacer y={4}/>
                    <div>
                        <Button size="sm" radius="none" className="w-full text-xs"  color="primary">Accept</Button>
                        <Button size="sm" radius="none" className="w-full text-xs">Decline</Button>
                    </div>
            </div>
            ))
            }
        </div>
</>
}
