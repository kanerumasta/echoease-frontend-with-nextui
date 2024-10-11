import { EmptyList } from "@/components/empty-list"
import CustomImage from "@/components/image"
import { useAcceptConnectionRequestMutation, useDeclineConnectionRequestMutation, useFetchReceivedConnectionRequestsQuery } from "@/redux/features/artistApiSlice"
import { ConnectionRequestSchema } from "@/schemas/artist-schemas"
import { Button } from "@nextui-org/button"
import { Spacer } from "@nextui-org/spacer"
import { Spinner } from "@nextui-org/spinner"
import { z } from "zod"


export const ConnectionRequests = () => {
const {data:requests, isLoading} = useFetchReceivedConnectionRequestsQuery()
return <>
        <div className="flex gap-2 w-full overflow-x-scroll scrollbar-hide">
            {isLoading && <Spinner />}
            {requests && requests.length <= 0 && <EmptyList message="Empty Requests."/>}
            {requests && requests.map(req=>(
                <Card  key={req.id} request={req}/>
            ))
            }
        </div>
</>
}

const Card = ({request}:{request:z.infer<typeof ConnectionRequestSchema>}) => {
    const [acceptConnectionRequest] = useAcceptConnectionRequestMutation()
    const [declineConnectionRequest] = useDeclineConnectionRequestMutation()
    const handleAccept = () => {
        acceptConnectionRequest(request.id.toString())
    }
    const handleDecline = () => {
        declineConnectionRequest(request.id.toString())
    }
return (
    <div  className="min-w-[150px] bg-white/20 p-2 rounded-md">
                    <CustomImage width="100%" height="100px" src={`${process.env.NEXT_PUBLIC_HOST}${request.sender.user.profile?.profile_image}`} />
                    <div>
                        <p className="text-sm capitalize">{request.sender.user.fullname}</p>
                    </div>
                    <Spacer y={4}/>
                    <div>
                        <Button onClick={handleAccept} size="sm" radius="none" className="w-full text-xs"  color="primary">Accept</Button>
                        <Button onClick={handleDecline} size="sm" radius="none" className="w-full text-xs">Decline</Button>
                    </div>
            </div>
)
}
