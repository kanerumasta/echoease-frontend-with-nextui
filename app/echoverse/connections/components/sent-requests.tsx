import { Button } from "@nextui-org/button";
import Link from "next/link";
import { z } from "zod";

import { EmptyList } from "@/components/empty-list";
import CustomImage from "@/components/image";
import {
  useDeleteConnectionRequestMutation,
  useFetchSentConnectionRequestsQuery,
} from "@/redux/features/artistApiSlice";
import { ConnectionRequestSchema } from "@/schemas/artist-schemas";

export const SentConnectionRequests = () => {
  const { data: sentRequests } = useFetchSentConnectionRequestsQuery();

  return (
    <div className="flex gap-1 overflow-x-scroll min-h-[200px]  md:max-w-[400px]">
      {sentRequests && sentRequests.length <= 0 && (
        <EmptyList message="No Sent Connection Requests." />
      )}
      {sentRequests &&
        sentRequests?.map((req) => <Card key={req.id} request={req} />)}
    </div>
  );
};

const Card = ({
  request,
}: {
  request: z.infer<typeof ConnectionRequestSchema>;
}) => {
  const [deleteConnectionRequest, { isLoading }] =
    useDeleteConnectionRequestMutation();

  const handleCancelRequest = () => {
    deleteConnectionRequest(request.id.toString());
  };

  return (
    <div className="min-w-[180px] bg-white/10 p-2 rounded-md">
      <CustomImage
        height="100px"
        src={`${process.env.NEXT_PUBLIC_HOST}${request.receiver.user.profile?.profile_image}`}
        width="100%"
      />
      <div>
        <Link href={`/${request.receiver.slug}`}>
          <p className="text-sm hover:text-blue-500 my-2 capitalize">
            {request.receiver.user.fullname}
          </p>
        </Link>
      </div>
      <div>
        <Button
          className="w-full text-xs"
          isDisabled={isLoading}
          isLoading={isLoading}
          radius="sm"
          size="sm"
          onClick={handleCancelRequest}
        >
          Cancel Request
        </Button>
      </div>
    </div>
  );
};
