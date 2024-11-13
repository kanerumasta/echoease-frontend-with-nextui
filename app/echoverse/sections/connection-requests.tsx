import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { z } from "zod";

import { EmptyList } from "@/components/empty-list";
import CustomImage from "@/components/image";
import {
  useAcceptConnectionRequestMutation,
  useDeclineConnectionRequestMutation,
  useFetchReceivedConnectionRequestsQuery,
} from "@/redux/features/artistApiSlice";
import { ConnectionRequestSchema } from "@/schemas/artist-schemas";
import { cn } from "@/lib/utils";

export const ConnectionRequests = () => {
  const { data: requests, isLoading } =
    useFetchReceivedConnectionRequestsQuery();

  return (
    <>
      <div className="min-h-[90%] w-full">
        <h1 className="mb-3 text-md text-white/50">Connection Requests</h1>
        {isLoading && <Spinner />}
        {requests && requests.length <= 0 && (
            <div className="h-[200px] flex items-center justify-center">
                <EmptyList message="Empty Requests." />
          </div>
        )}
        {requests &&
        <div className={cn("flex  w-full gap-2 overflow-x-scroll",{"scrollbar-hide":requests.length < 2})}>
        {requests.map((req) => <Card key={req.id} request={req} />)}
        </div>
}
      </div>
    </>
  );
};

const Card = ({
  request,
}: {
  request: z.infer<typeof ConnectionRequestSchema>;
}) => {
  const [acceptConnectionRequest] = useAcceptConnectionRequestMutation();
  const [declineConnectionRequest] = useDeclineConnectionRequestMutation();
  const handleAccept = () => {
    acceptConnectionRequest(request.id.toString());
  };
  const handleDecline = () => {
    declineConnectionRequest(request.id.toString());
  };

  return (
    <div className="min-w-[150px] bg-white/20 p-2 rounded-md">
      <CustomImage
        height="100px"
        src={`${process.env.NEXT_PUBLIC_HOST}${request.sender.user.profile?.profile_image}`}
        width="100%"
      />
      <div>
        <p className="text-sm capitalize">{request.sender.user.fullname}</p>
      </div>
      <Spacer y={4} />
      <div>
        <Button
          className="w-full text-xs"
          color="primary"
          radius="none"
          size="sm"
          onClick={handleAccept}
        >
          Accept
        </Button>
        <Button
          className="w-full text-xs"
          radius="none"
          size="sm"
          onClick={handleDecline}
        >
          Decline
        </Button>
      </div>
    </div>
  );
};
